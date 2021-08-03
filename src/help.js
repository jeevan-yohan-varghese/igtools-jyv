
import './help_styles.css';
import settings_img from './images/settings.JPG';
import data_download_img from './images/data_download.JPG';
import email_img from './images/email_format.JPG';
import ic_settings from './images/settings.svg';
import ic_email from './images/email.svg';
import ic_data from './images/data.svg';
import ic_folder from './images/folder.svg';
function Help() {
    return (
        <div id="help_main_div">
            <h3>How to get these json files?</h3>
            <div className="row">
                <div className="row_item help_item_container">
                    <div className="help_title_container">
                        <img src={ic_settings} alt="" width="30px" />
                        <p>Go to your instagram settings and select <a href="https://www.instagram.com/accounts/privacy_and_security/" target="_blank" rel="noreferrer">Privacy and Security</a></p>
                    </div>
                    <div className="help_img_wrapper">
                        <img src={settings_img} alt="" className="help_sh" />
                    </div>


                </div>
                <div className="row_item help_item_container">
                    <div className="help_title_container">
                        <img src={ic_data} alt="" width="30px" />
                        <p>Go to data download and click request download</p>
                    </div>
                    <div className="help_img_wrapper">
                        <img src={data_download_img} alt="" className="help_sh" />
                    </div>



                </div>
            </div>

            <div className="help_item_container">
                <div className="help_title_container">
                    <img src={ic_email} alt="" width="30px" />
                    <p>Enter your email and select format as json</p>
                </div>
                <div className="help_img_wrapper">
                    <img src={email_img} alt="" className="help_sh" />
                </div>



            </div>

            <div className="help_item_container">
                <div className="help_title_container">
                    <img src={ic_folder} alt="" width="30px" />
                    <p>Download the file received by email.  Unzip the file and you will find followers.json and following.json in a folder name followers and following</p>
                </div>
               



            </div>
        </div>
    );
}

export default Help;