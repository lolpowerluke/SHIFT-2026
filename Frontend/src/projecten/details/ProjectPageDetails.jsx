import React, { useState } from "react";
import { useEffect } from "react";
import "./index.css";

export default function ProjectPageDetails() {	
  	useEffect(() => {
    document.body.classList.add("index");
    return () => document.body.classList.remove("index");
  }, []);

    
	return (
		<>
			<div className="ctx">
				<div className="titleDiv">
					<div className="backButton">
						<button><img src="/assets/arrow_back.svg" alt="Back arrow Icon" />Back</button>
					</div>
					<div className="titleText">
						<h1>After Dark</h1>
						<div className="titleNames">
							<div className="name">
								<p>Hamza El Aisati & Hamza El Aisati</p>
							</div>
							<div className="subject">
								<img src="/assets/OrangeDesign.svg" alt="Digital Design Icon" />
								<p><b>Digital Design</b></p>
							</div>
						</div>
					</div>
				</div>
				<div className="imgDiv">
					<img src="/assets/imageCard.png" alt="project image" />
				</div>
				<div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

						Curabitur pretium tincidunt lacus. Nulla gravida orci a odio, et tempus feugiat. Nullam varius turpis non risus commodo, vitae convallis nunc dapibus. Proin at massa vel velit posuere feugiat eget id justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
						Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
					</p>
					<p><b>Promoter</b></p>
					<p className="promoterName">Kobe Vermeire</p>
				</div>
				<div className="studentCardDiv">
					<div className="studentCards">
						<div className="picture">
							<img src="/assets/pictureForCard2.jpg" alt="picture for card" />
						</div>
						<div className="studentInfo">
							<div className="studentName">
								<p><b>Hamza El Aisati</b></p>
								<p>Multimedia & Creatieve Technologie</p>
							</div>
							<div className="studentContact">
								<div className="icons">
								<a href="student mail">
									<img src="/assets/mail_Icon.svg" alt="Email Icon" />
								</a>
								<a href="student LinkedIn URL">
									<img src="/assets/linkedIn_Icon.svg" alt="LinkedIn Icon" />
								</a>
								</div>
								<div className="magButton">
									<button><img src="/assets/download_icon.svg" alt="download arrow Icon" />Mijn magazine (PDF)</button>
								</div>
							</div>
						</div>
					</div>
					<div className="studentCards">
						<div className="picture">
							<img src="/assets/pictureForCard2.jpg" alt="picture for card" />
						</div>
						<div className="studentInfo">
							<div className="studentName">
								<p><b>Hamza El Aisati</b></p>
								<p>Multimedia & Creatieve Technologie</p>
							</div>
							<div className="studentContact">
								<div className="icons">
								<a href="student mail">
									<img src="/assets/mail_Icon.svg" alt="Email Icon" />
								</a>
								<a href="student LinkedIn URL">
									<img src="/assets/linkedIn_Icon.svg" alt="LinkedIn Icon" />
								</a>
								</div>
								<div className="magButton">
									<button><img src="/assets/download_icon.svg" alt="download arrow Icon" />Mijn magazine (PDF)</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<h1>Project video</h1>
					<div className="videoHolder">
					<iframe className="videoPlayer" width="703" src="https://www.youtube.com/embed/suQst6cwW4A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</>
	);
}
