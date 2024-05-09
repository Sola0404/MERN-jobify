import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
	try {
		const { data } = await customFetch.get("/jobs");
		return { data };
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

const AllJobs = () => {
	const { data } = useLoaderData();
	return (
		<div>
			<SearchContainer />
			<JobsContainer />
		</div>
	);
};

export default AllJobs;
