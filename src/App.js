import "./App.css";
import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import SendBirdCall from "sendbird-calls";
import axios from "axios";
import SendBird from "sendbird";

const APP_ID = "5471A53B-063C-41C6-A75E-95332D3FC8C2";
const USER_ID = "Try";
SendBirdCall.init(APP_ID);
function App() {

  const createUser = () => {
    const body = {
      user_id: "Jacob",
      nickname: "Asty",
      profile_url:
        "https://sendbird.com/main/img/profiles/profile_05_512px.png",
      issue_access_token: false,
      metadata: {
        font_preference: "times new roman",
        font_color: "black",
      },
    };
    const apiUrl =
      "https://api-5471A53B-063C-41C6-A75E-95332D3FC8C2.sendbird.com/v3/users";
    console.log(apiUrl, "apiUrl");
    axios
      .post(apiUrl, body, {
        headers: {
          "Content-Type": "application/json",
          "Api-Token": "69950fe8850535e1a1d9c591f1e93b3a519693ec",
        },
      })
      .then((response) => {
        console.log(response, "respo");
      });
    // try {
    //   const response = axios.post(apiUrl, body, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Api-Token': '69950fe8850535e1a1d9c591f1e93b3a519693ec',
    //     },
    //   });

    //   console.log('User created successfully:', response.data);
    // } catch (error) {
    //   console.error('Error creating user:', error.response.data);
    // }
  };

  const blockUser = async (userIdToBlock) => {
    try {
      const sb = new SendBird({ APP_ID }); // Replace YOUR_APP_ID with your actual SendBird Application ID
      const user = await sb.blockUser({ userId: userIdToBlock });
      console.log(user, "user");
    } catch (err) {
      console.error("Error blocking user:", err);
    }
  };

  const UnblockUser = async (userIdToBlock) => {
    try {
      const sb = new SendBird({ APP_ID }); // Replace YOUR_APP_ID with your actual SendBird Application ID
      const user = await sb.unblockUser({ userId: userIdToBlock });
      console.log(user, "user");
    } catch (err) {
      console.error("Error blocking user:", err);
    }
  };



  return (
    <div className="App">
      <SendbirdApp appId={APP_ID} userId={USER_ID} />
      <button onClick={() => createUser()}>Create User</button>
      <button
        onClick={() =>
          blockUser(
            "sendbird_desk_agent_id_f827abfe-b81a-4bb6-a67c-23bd62746af0"
          )
        }
      >
        Block User
      </button>
      <button
        onClick={() =>
          UnblockUser(
            "sendbird_desk_agent_id_f827abfe-b81a-4bb6-a67c-23bd62746af0"
          )
        }
      >
        UNBlock User
      </button>

    </div>
  );
}

export default App;
