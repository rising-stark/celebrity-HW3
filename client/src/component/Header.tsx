import { PageHeader, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined, StopOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal";
import { useCookies } from "react-cookie";
import { deleteAccount } from "../service";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const clearCookies = () => {
    removeCookie("jwt");
    removeCookie("username");
  };
  const onDelete = () => {
    Modal.confirm({
      closable: true,
      title: "Delete Account & Data associated with it?",
      icon: <StopOutlined />,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        deleteAccount(cookies.username)
          .then(() => {
            clearCookies();
            alert("Account deleted successfully.");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            alert("Server error. Try again after sometime");
          });
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
        clearCookies();
        navigate("/login");
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
