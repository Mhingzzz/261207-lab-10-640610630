import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
	//read value from URL
	const roomId = req.query.roomId;
	const messageId = req.query.messageId;

	if (req.method === "DELETE") {
		const rooms = readDB();
		const room = rooms.find((room) => room.roomId === roomId);
		if (room) {
			const messageIdx = room.messages.findIndex(
				(message) => message.messageId === messageId
			);
			if (messageIdx === -1) {
				res.status(404).json({
					ok: false,
					message: "Invalid message ID",
				});
			} else {
				room.messages.splice(messageIdx, 1);
				writeDB(rooms);
				res.status(200).json({
					ok: true,
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
