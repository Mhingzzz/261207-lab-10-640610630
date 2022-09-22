import axios from "axios";
import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
	const rooms = readDB("../../backendLibs/dbLib.js");
	res.status(200).json({
		ok: true,
		rooms: rooms.map((room) => {
			return {
				roomId: room.roomId,
				roomName: room.roomName,
			};
		}),
	});
}
