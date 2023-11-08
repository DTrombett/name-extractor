"use client";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Agbalumo } from "next/font/google";
import { useState } from "react";

const font = Agbalumo({ weight: "400", subsets: ["latin"] });

const Home = () => {
	const [names, setNames] = useState([] as { name: string; id: number }[]);
	const [current, setCurrent] = useState("");
	const [choosing, setChoosing] = useState(false);
	const [chosen, setChosen] = useState("");

	return (
		<main className="flex flex-col h-full p-4 items-center justify-center text-center">
			<span className={`my-4 text-5xl ${font.className}`}>Name Extractor</span>
			<span className="text-xl font-light">
				Insert some names and let the fate choose one!
			</span>
			<div className="flex flex-col my-8 px-2 overflow-auto names">
				{names.map((data, i) => {
					const deleteElement = () => {
						setNames(names.filter(n => n.id !== data.id));
					};

					return (
						<div key={data.id} className="my-1">
							<input
								className="mx-4 px-4 py-3 rounded outline-none duration-200 bg-white dark:bg-black bg-opacity-20 dark:bg-opacity-10 text-xl hover:bg-opacity-30 insertedName"
								value={data.name}
								onChange={e => {
									const newNames = [...names];

									newNames[i].name = e.target.value;
									setNames(newNames);
								}}
								onBlur={event => {
									if (!event.target.value) deleteElement();
								}}
							/>
							<button
								className="p-3 rounded bg-zinc-300 dark:bg-zinc-700 text-xl enabled:hover:scale-110 enabled:hover:text-red-400 enabled:active:scale-95 duration-500 focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:cursor-not-allowed"
								onClick={deleteElement}
								disabled={choosing}
							>
								<FontAwesomeIcon icon={faTrashCan} />
							</button>
						</div>
					);
				})}
			</div>
			<form
				className="flex justify-center"
				onSubmit={event => {
					event.preventDefault();
					setNames([...names, { name: current.trim(), id: names.length }]);
					setCurrent("");
				}}
			>
				<input
					className="p-4 rounded outline-none duration-200 bg-zinc-200 dark:bg-zinc-800 text-2xl hover:bg-opacity-80 nameInput"
					name="name"
					placeholder="Insert a name"
					autoFocus={true}
					autoComplete="name"
					value={current}
					onChange={e => setCurrent(e.target.value)}
				/>
				<button
					className="p-4 rounded duration-500 bg-zinc-300 dark:bg-zinc-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 enabled:hover:scale-110 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800"
					disabled={choosing || !current.trim()}
				>
					Add
				</button>
			</form>
			<button
				className="my-16 p-4 rounded-md duration-500 bg-zinc-300 dark:bg-zinc-700 text-4xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 enabled:hover:scale-110 enabled:active:scale-95 enabled:active:text-lime-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800"
				disabled={choosing || names.length < 2}
				onClick={() => {
					setChoosing(true);
					let found = NaN;
					let i = 0;
					let laps = 0;
					const run = () => {
						if (laps === 4 && i === 0)
							found = Math.floor(Math.random() * names.length);
						setChosen(names[i].name);
						if (Math.random() < 0.5 / names.length || i === found)
							return setChoosing(false);
						i++;
						if (i === names.length) {
							i = 0;
							laps++;
						}
						setTimeout(
							run,
							(laps + i / names.length) * 10 + 500 / names.length
						);
					};

					run();
					document.querySelector("#chosen")?.scrollIntoView();
				}}
			>
				Go!
			</button>
			<span
				className="text-2xl"
				style={{ display: chosen ? "" : "none" }}
				id="chosen"
			>
				I choose <b>{chosen}</b>!
			</span>
		</main>
	);
};

export default Home;
