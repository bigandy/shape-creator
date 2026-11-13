import { StackProvider } from "@context/StackProvider";
import { Toaster } from "react-hot-toast";
import { MainArea } from "@/components/MainArea";
import { Sidebar } from "@/components/Sidebar";

import "./App.css";

function App() {
	return (
		<StackProvider>
			<MainArea />

			<Sidebar />

			<Toaster position="bottom-center" />
		</StackProvider>
	);
}

export default App;
