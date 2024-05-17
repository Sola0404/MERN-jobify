import {
	Outlet,
	redirect,
	useLoaderData,
	useNavigate,
	useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSidebar, BigSidebar, Navbar, Loading } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
// global context
const DashboardContext = createContext();

export const loader = async () => {
	try {
		const { data } = await customFetch("/users/current-user");
		return data;
	} catch (error) {
		return redirect("/");
	}
};

const DashboardLayout = () => {
	const { user } = useLoaderData();
	const navigate = useNavigate();
	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);
		document.body.classList.toggle("dark-theme", newDarkTheme);
		localStorage.setItem("darkTheme", newDarkTheme);
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const logoutUser = async () => {
		navigate("/");
		await customFetch.get("/auth/logout");
		toast.success("Logging out...");
	};

	const navigation = useNavigation();
	const isPageLoading = navigation.state === "loading";

	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				isDarkTheme,
				toggleDarkTheme,
				toggleSidebar,
				logoutUser,
			}}
		>
			<Wrapper>
				<main className="dashboard">
					<SmallSidebar />
					<BigSidebar />
					<div>
						<Navbar />
						<div className="dashboard-page">
							{isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
