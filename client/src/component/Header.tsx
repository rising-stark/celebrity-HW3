import { PageHeader, Button } from "antd";
import { currentPlayerLS } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined, StopOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal";

const Header = () => {
  const navigate = useNavigate();
  const onDelete = () => {
    Modal.confirm({
      closable: true,
      title: "Delete Account & Data associated with it?",
      icon: <StopOutlined />,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        const player = localStorage.getItem(currentPlayerLS);
        localStorage.removeItem(currentPlayerLS);
        if (player) {
          localStorage.removeItem(player);
        }
        navigate("/");
      },
    });
  };
  const onSignOut = () => {
    Modal.confirm({
      closable: true,
      title: "Sign Out?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        localStorage.removeItem(currentPlayerLS);
        navigate("/");
      },
    });
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        onBack={() => {
          onBack();
        }}
        title="Guess The Celeb"
        subTitle="How well do you know your celebrities?"
        extra={[
          <Button key={1}>
            <Link
              data-cy="link-leadboard"
              style={{ color: "blue" }}
              to="/leaderBoard">
              LeaderBoard
            </Link>
          </Button>,
          <Button
            key={2}
            data-cy="button-delete"
            danger
            onClick={() => {
              onDelete();
            }}>
            Delete Account
          </Button>,
          <Button
            key={3}
            onClick={() => {
              onSignOut();
            }}>
            Sign Out
          </Button>,
        ]}
      />
    </div>
  );
};

export { Header };
