import { ModalProvider } from "./context/ModalContext";
import PromptModule from "./modules/prompt";
import ClipboardModule from "./modules/clipboard";
import ModalModule from "./modules/modal";
import InputDialogModule from "./modules/input_dialog";
import ContextMenuModule from "./modules/context_menu";
import ProgressModule from "./modules/progress";
import SkillCheckModule from "./modules/skill_check";
import { BackgroundImage } from "@mantine/core";
import { isEnvBrowser } from "./utils/misc";

const App = () => (
	<ModalProvider>
		<Wrapper>
			<PromptModule />
			<ClipboardModule />
			<ModalModule />
			<InputDialogModule />
			<ContextMenuModule />
			<ProgressModule />
			<SkillCheckModule />
		</Wrapper>
	</ModalProvider>
);

export default App;

function Wrapper({ children }: { children: React.ReactNode }) {
	return isEnvBrowser() ? (
		<BackgroundImage
			w="100vw"
			h="100vh"
			src="https://images2.alphacoders.com/596/596921.jpg"
			style={{
				overflow: "hidden",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{children}
		</BackgroundImage>
	) : (
		<>{children}</>
	);
}
