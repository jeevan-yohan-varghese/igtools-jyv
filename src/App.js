import React, { useEffect, useState } from 'react';
import './App.css';




function App() {
  const [selectedFileFollowers, setFileFollowers] = useState("");
  const [selectedFileFollowing, setFileFollowing] = useState("");
  const [followersList, setFollowers] = useState(null);
  const [followingList, setFollowing] = useState(null);
  const [appState, setAppState] = useState(
    { resultReady: false, 
      unfollow_list:[]
    }
  );
  

  const handleChangeFollowers = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onloadend = () => {
      //console.log("e.target.result", e.target.result);
      setFileFollowers(JSON.parse(fileReader.result));
    };
  };

  const handleChangeFollowing = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onloadend = () => {
      //console.log("e.target.result", e.target.result);
      setFileFollowing(JSON.parse(fileReader.result));
    };
  };
  useEffect(() => {
    let followers_id = [];
    if (selectedFileFollowers) {

      const followers_list = selectedFileFollowers.relationships_followers;
      followers_list.forEach(element => {
        followers_id.push(element.string_list_data[0].value);
      });
      followers_id.forEach((e) => {
        console.log(e);
      });
      setFollowers(followers_id);

    }
  }, [selectedFileFollowers]);

  useEffect(() => {
    let following_id = [];
    if (selectedFileFollowing) {

      const following_list = selectedFileFollowing.relationships_following;
      following_list.forEach(element => {
        following_id.push(element.string_list_data[0].value);
      });
      following_id.forEach((e) => {
        console.log(e);
      });
      setFollowing(following_id);

    }
  }, [selectedFileFollowing]);
  //Function to find people who are not following you but you are following
  const findUnfollowers = () => {
    if (selectedFileFollowers !== "" && selectedFileFollowing !== "") {
      let mUnfollowing = followersList.filter(f => !followingList.includes(f));
      console.log(mUnfollowing);
      setAppState({ resultReady: true ,unfollow_list:mUnfollowing});
    }
  }

  const showResult = () => {

    console.log("showResult called")
    const listItems = appState.unfollow_list.map((u) =>
      <li>{u}</li>
    );
    
    return (

      <div>

        <ul>

          {listItems}
        </ul>
      </div>
    );

  }
  return (
    <div>

      <h1>Select json file</h1>
      <label>followers.json</label>
      <input type='file' onChange={(e) => { handleChangeFollowers(e) }} />
      <label>following.json</label>
      <input type='file' onChange={(e) => { handleChangeFollowing(e) }} />
      <button onClick={findUnfollowers}>Who is not following</button>
      {appState.resultReady ? showResult() : <div></div>}

    </div>
  );

}

export default App;
