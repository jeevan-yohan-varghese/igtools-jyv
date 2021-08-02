import React, { useEffect, useState } from 'react';
import './App.css';

import icon_verified from './images/verified.svg';


function App() {

  const [selectedFileFollowers, setFileFollowers] = useState("");
  const [selectedFileFollowing, setFileFollowing] = useState("");
  const [followersList, setFollowers] = useState(null);
  const [followingList, setFollowing] = useState(null);
  const[followersFileStatus,setFollowersFileStatus]=useState({
    msg:"",
    empty:true
  });
  const[followingFileStatus,setFollowingFileStatus]=useState({
    msg:"",
    empty:true
  });
  const [appState, setAppState] = useState(
    {
      resultReady: false,
      unfollow_list: []
    }
  );

  const [secondList,setSecondList]= useState({
    resultReady: false,
    nonfollowing_list: []
  });


  const handleChangeFollowers = e => {
    try{
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (r) => {
        //console.log("e.target.result", e.target.result);
        try{
          setFileFollowers(JSON.parse(r.target.result));
          console.log(e.target.files[0].name);
          setFollowersFileStatus({msg:r.target.fileName,empty:false})
        }catch(e){
          console.log("Exception occured invalid file");
          setFollowersFileStatus({msg:"Invalid file",empty:true})
        }
        
      };
    }catch(e){
      console.log("Exception occured");
      setFollowersFileStatus({msg:"Invalid file",empty:true})
    }
   
  };

  const handleChangeFollowing = e => {
    try{
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onloadend = () => {
        //console.log("e.target.result", e.target.result);
        try{
          setFileFollowing(JSON.parse(fileReader.result));
          setFollowingFileStatus({msg:"",empty:false})
        }catch(e){
          setFollowingFileStatus({msg:"Invalid file",empty:true})
        }
      
      };
    }catch(e){
      setFollowingFileStatus({msg:"Invalid file",empty:true})
    }
   
  };
  useEffect(() => {
    let followers_id = [];
    try{
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
    }catch(e){
      setFollowersFileStatus({msg:"Wrong json format",empty:true})
    }
    
  }, [selectedFileFollowers]);

  useEffect(() => {
    let following_id = [];
    try{
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
    }catch(e){
      setFollowingFileStatus({msg:"Wrong json format",empty:true})
    }
  
  }, [selectedFileFollowing]);


  const findFollowers = () => {
    if (selectedFileFollowers !== "" && selectedFileFollowing !== "") {
        //Function to find people who are not following you but you are following

      let mUnfollowing = followingList.filter(f => !followersList.includes(f));
      console.log(mUnfollowing);
      setAppState({ resultReady: true, unfollow_list: mUnfollowing });

      //Function to find people who are  following you but you are not following
      let mNonfollowing = followersList.filter(f => !followingList.includes(f));
      console.log(mNonfollowing);
      setSecondList({ resultReady: true, nonfollowing_list: mNonfollowing });
    }
  }



  


  const showUnFollowers = () => {

    console.log("showResult called")
    const listItems = appState.unfollow_list.map((u) =>{
    
      const hrefStr="https://instagram.com/"+u;
      return <li><a href={hrefStr} target="_blank" rel="noreferrer">{u}</a></li>
    }
      
     
    );

    return (

      <div className="list_div">
        <h2>Unfollowers List</h2>
        <ul className="id_list">

          {listItems}
        </ul>
      </div>
    );

  }

  const showNonFollowing = () => {

    console.log("showResult called")
    const listItems = secondList.nonfollowing_list.map((u) =>{
    
      const hrefStr="https://instagram.com/"+u;
      return <li><a href={hrefStr} target="_blank" rel="noreferrer">{u}</a></li>
    }
      
     
    );

    return (

      <div className="list_div">
        <h2>Non Following List</h2>
        <ul className="id_list">

          {listItems}
        </ul>
      </div>
    );

  }
  const hiddenFollowersFileInput = React.useRef(null);
  const hiddenFollowingFileInput = React.useRef(null);

  
  //Simulating click of followers file input
  const clickFollowersInput = (event) => {
    hiddenFollowersFileInput.current.click();
  }
  //Simulating click of folllowing file input
  const clickFollowingInput = (event) => {
    hiddenFollowingFileInput.current.click();
  }
  return (
    <div className="wrapper">
    <div className="inputs_div_container">
      <div className="inputs_content_div">


        <h3>Select json file</h3>
        <div id="file_inputs_wrapper">

        
        <div className="file_input_container" id="followers_input_container">
          <label>Choose followers list <b>(followers.json)</b></label>
          <button onClick={clickFollowersInput} className="input_btn">Select file</button>
          <input id="followers_input"
            type='file'
            onChange={(e) => { handleChangeFollowers(e) }}
            style={{ display: 'none' }}
            ref={hiddenFollowersFileInput}
          />
          {!followersFileStatus.empty? <div><img src={icon_verified} className="small_icon" alt="file ok icon"/>
          <p>{followersFileStatus.msg}</p>
          </div>
          :
          followersFileStatus.msg!==""?<p className="err_msg">{followersFileStatus.msg}</p>:""}
         
        </div>
        <div className="file_input_container" id="following_input_container">
          <label>Choose following list <b>(following.json)</b></label>
          
          <button onClick={clickFollowingInput} className="input_btn">Select file</button>
          <input id="following_input"
            type='file'
            onChange={(e) => { handleChangeFollowing(e) }}
            style={{ display: 'none' }}
            ref={hiddenFollowingFileInput}
          />
          {!followingFileStatus.empty? <div><img src={icon_verified} className="small_icon" alt="file ok icon"/>
          <p>{followingFileStatus.msg}</p>
          </div>
          :
          followingFileStatus.msg!==""?<p className="err_msg">{followingFileStatus.msg}</p>:""}
        </div>
        </div>
        <div id="primary_btn_wrapper">

        <button onClick={findFollowers} className="primary_btn">FIND</button>
       

        </div>
      </div>

    </div>
    {appState.resultReady && secondList.resultReady ? <div className="result_container">{showUnFollowers()}{showNonFollowing()}</div>:<div></div>}
   
    </div>
  );

}

export default App;
