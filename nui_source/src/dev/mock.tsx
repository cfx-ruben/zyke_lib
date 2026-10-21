// This data is not sent; only the information necessary to adjust your main interface from within the browser is used.

import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const post = (event: string, data: any = {}) => window.postMessage({ event, data }, "*");

let progressId = 0;

const demos: Record<string, () => void> = {
	// Show Prompt
    "Show Prompt": () =>
        post("ShowPrompt", { 
			id: "demo", 
			resource: "demo",
			key: ["E"], 
			label: "Interact" 
		}
	),

	// Remove Prompt
    "Remove Prompt": () => 
		post("RemovePrompt", { 
			id: "demo", 
			resource: "demo" 
		}
	),

	// Open Context Menu
    "Context Menu": () =>
        post("OpenContextMenu", {
            id: "demo_menu",
            title: "Sample menu",
            description: "Preview in browser",
            icon: "menu",
            position: "top-right",
            options: [
                { 
					title: "Option 1", 
					description: "First option", 
					icon: "home" 
				},
                { 
					title: "Option 2", 
					description: "Second option", 
					icon: "star", 
					progress: 60 
				},
                { 
					title: "Disabled", 
					disabled: true, 
					disabledTooltip: "Not available" 
				},
            ],
        }
	),

	// Open Form
    "Form": () =>
        post("OpenForm", {
            formId: "demo_form",
            title: "Sample form",
            inputs: [
                { 
					type: "paragraph", 
					text: "Fill in the fields:" 
				},
                { 
					type: "text", 
					name: "name", 
					label: "Name", 
					placeholder: "Write here" 
				},
                { 
					type: "number", 
					name: "age", 
					label: "Age", 
					min: 0, 
					max: 99, 
					defaultValue: 18 
				},
                { 
					type: "checkbox",
					name: "ok", 
					label: "I accept" 
				},
                { 
					type: "slider", 
					name: "vol", 
					label: "Volume", 
					min: 0, 
					max: 100, 
					defaultValue: 50 
				},
            ],
            options: { 
				showCancel: true 
			},
        }
	),

	// Open Square Progress
    "Square Progress": () =>
        post("OpenProgress", {
            id: ++progressId, 
			type: "bar", 
			duration: 5000,
            label: "Charging…", 
			description: "Hang on a minute", 
			position: "bottom", 
			canCancel: true,
        }
	),

	// Open Circle Progress
    "Circle Progress": () =>
        post("OpenProgress", {
            id: ++progressId, 
			type: "circle", 
			duration: 5000,
            label: "Processing", 
			position: "middle",
        }
	),
	
	// Open Skill Check
    "Skill Check": () =>
        post("OpenSkillCheck", {
            difficulty: [
				{ 
					areaSize: 50, 
					speedMultiplier: 1 
				}, 
				{ 
					areaSize: 40, 
					speedMultiplier: 1.5 
				}
			],
            inputs: ["e", "space"],
        }),
};

// Individual button component for handling hover/active states
const DevButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const buttonStyle: React.CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "6px 10px",
        backgroundColor: isHovered ? "rgba(55, 59, 65, 0.95)" : "rgba(42, 45, 49, 0.85)",
        color: isHovered ? "#ffffff" : "#f3f4f6",
        fontFamily: "inherit",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.2px",
        textAlign: "left",
        border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.12)"}`,
        borderRadius: 6,
        outline: "none",
        cursor: "pointer",
        boxShadow: isHovered ? "0 4px 12px rgba(0, 0, 0, 0.35)" : "0 2px 4px rgba(0, 0, 0, 0.2)",
        transform: isActive ? "translateY(0px)" : isHovered ? "translateY(-1px)" : "translateY(0px)",
        transition: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
        userSelect: "none",
    };

    return (
        <button
            style={buttonStyle}

            onMouseEnter={() => 
				setIsHovered(true)
			}

            onMouseLeave={() => {
                setIsHovered(false);
                setIsActive(false);
            }}

            onMouseDown={() => 
				setIsActive(true)
			}

            onMouseUp={() => 
				setIsActive(false)
			}

            onClick={onClick}
        >
            {children}
        </button>
    );
};

const InDevPreview = () => {
    const [open, setOpen] = useState(true);

    return (
        <div
            style={{
                position: "fixed", 
                bottom: 16, 
                right: 16, 
                zIndex: 99999,
                background: "rgba(20, 22, 25, 0.9)", 
                border: "1px solid #444", 
                borderRadius: 10,
                padding: 10, 
                fontFamily: "system-ui, sans-serif", 
                fontSize: 13, 
                color: "#fff",
                display: "flex", 
                flexDirection: "column", 
                gap: 6, 
                width: 160,
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)", 
            }}
        >
            <DevButton onClick={() => setOpen(!open)}>
                {open ? "Dev preview" : "Dev preview"}
            </DevButton>
            {open &&
                Object.entries(demos).map(([name, fn]) => (
                    <DevButton key={name} onClick={fn}>{name}</DevButton>
                ))}
        </div>
    );
};

/**
    I only develop in the browser.
    It is removed from the build used in FiveM.
**/
export const isInBrowser = () => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    ReactDOM.createRoot(el).render(<InDevPreview />);
};
