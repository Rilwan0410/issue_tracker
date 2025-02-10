import { prisma } from "../../../prisma/client";
import axios from "axios";
async function updateUser(userId, issue) {
  //   const user = await prisma.user.findUnique({ where: { id: userId } });

  await axios.patch(`/api/issues/${issue.id}`, { assingedToUser: userId });
}
