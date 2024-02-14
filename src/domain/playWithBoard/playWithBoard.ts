import { Board } from "../board";
import { Play } from "../play/play";

export type PlayWithBoard = Omit<Play, 'attempts'> & { board: Board }