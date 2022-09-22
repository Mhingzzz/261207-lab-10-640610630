import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
	if (req.method === "GET") {
		const rooms = readDB();
		const roomId = req.query.roomId;
		const room = rooms.find((room) => room.roomId === roomId);
		if (room) {
			res.status(200).json({
				ok: true,
				messages: room.messages,
			});
		} else {
			res.status(404).json({
				ok: false,
				message: "Invalid room ID",
			});
		}
	} else if (req.method === "POST") {
		const rooms = readDB();

		//read request body
		const text = req.body.text;

		//create new id
		const newId = uuidv4();

		const roomId = req.query.roomId;
		const room = rooms.find((room) => room.roomId === roomId);
		if (room) {
			if (typeof text === "string" && text.length > 0) {
				room.messages.push({
					messageId: newId,
					text: text,
				});
				writeDB(rooms);
				res.status(200).json({
					ok: true,
					messages: {
						messageId: newId,
						text: text,
					},
				});
			} else {
				res.status(400).json({
					ok: false,
					message: "Invalid text input",
				});
			}
		} else {
			res.status(404).json({
				ok: false,
				message: "Invalid room ID",
			});
		}
	}
}
