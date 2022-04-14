import React, { useEffect, useState } from "react";
import { Steps, Row, Button, Radio, Space, message } from "antd";

// @ts-ignore
import ImageViewer from "react-simple-image-viewer";
import { CelebDatum, currentPlayerLS } from "../constants";
import { fetchAllCeleb, fetchScore } from "../service";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { useCookies } from "react-cookie";

const { Step } = Steps;

const Game = () => {
  const [celebData, setCelebData] = useState<CelebDatum[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [topScore, setTopScore] = useState<[string, number]>(["", 0]);
  const [myTopScore, setMyTopScore] = useState(0);
  const [cookies] = useCookies();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCeleb().then((res) => {
      setCelebData(res);
    });
  }, []);

  useEffect(() => {
    fetchScore(cookies.username).then((res) => {
      setMyTopScore(res.myScore.bestScore);
      setTopScore([res.bestScore[0].username, res.bestScore[0].bestScore]);
    });
  }, [cookies.username, myTopScore]);

  useEffect(() => {
    if (celebData.length > 0) {
      setOptions([
        celebData[index].option1,
        celebData[index].option2,
        celebData[index].option3,
        celebData[index].option4,
      ]);
    }
  }, [celebData, index]);

  const confirmAnswer = () => {
    if (selectedOption === "") {
      message.warning("Please select an answer");
      return;
    }
    if (selectedOption === celebData[index]?.correct_option) {
      message.success("Correct Answer");
      setScore((scoreTem) => scoreTem + 1);
    } else {
      message.error("Wrong Answer");
    }
    setSelectedOption("");
    setIndex((indexTem) => Math.min(indexTem + 1, celebData.length - 1));
    if (Math.min(index + 1, celebData.length - 1) === index) {
      const username = localStorage.getItem(currentPlayerLS);
      if (!username) {
        return;
      }
      const propsState = {
        score: score,
        best: username
          ? parseInt(localStorage.getItem(username) || "0", 10)
          : 0,
      };
      console.log(propsState);
      navigate("/score", { state: propsState });
      if (
        username &&
        parseInt(localStorage.getItem(username) || "0", 10) < score
      ) {
        localStorage.setItem(username, score.toString());
      }
    }
  };

  const onOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Header />
      <Row
        justify="center"
        //@ts-ignore
        type="flex"
        align="middle"
        style={{ minHeight: "90vh" }}>
        <Steps progressDot current={index} direction="horizontal">
          {celebData.map((celebDatum, indexTem) => (
            <Step key={indexTem} title={"Question " + (indexTem + 1)} />
          ))}
        </Steps>
        <div>
          <div>
            Current Score: {score}/{celebData.length}
          </div>
          {topScore !== undefined && (
            <div>
              Global Top Score: {topScore[1]}/{celebData.length} by{" "}
              {topScore[0]}
            </div>
          )}
          <div>
            {myTopScore !== undefined && <>Your Top Score: {myTopScore}</>}
          </div>
          <img
            src={celebData[index]?.imgUrl}
            onClick={() => setPopupVisibility(true)}
            width="300"
            height="300"
            key={index}
            alt=""
          />
          {popupVisibility && (
            <ImageViewer
              src={[celebData[index]?.imgUrl]}
              currentIndex={0}
              onClose={() => setPopupVisibility(false)}
              disableScroll={false}
              closeOnClickOutside={true}
            />
          )}
        </div>
        <Radio.Group
          value={selectedOption}
          onChange={(e) => {
            onOptionSelect(e.target.value);
          }}>
          <Space direction="vertical">
            {options.map((option, indexRadio) => (
              <Radio
                data-cy={`radio-${indexRadio}`}
                key={option}
                value={option}>
                {option}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        <div>
          <Button data-cy="button-next" onClick={confirmAnswer}>
            Next
          </Button>
        </div>
      </Row>
    </>
  );
};

export { Game };
