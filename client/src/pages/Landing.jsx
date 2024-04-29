import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						Job <span>Tracking</span> App
					</h1>
					<p>The best helper on your career path.</p>
					<Link to="/register" className="btn register-link">
						Register
					</Link>
					<Link to="/login" className="btn">
						Login / Demo User
					</Link>
				</div>
				<img src={main} alt="job hunter" className="img main-img" />
			</div>
		</Wrapper>
	);
};

export default Landing;
