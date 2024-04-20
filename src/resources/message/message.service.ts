import { log } from "@/utils/index";
import { SendMessageInterface } from "./message.interface";
import sendEmail, { generateEmail } from "@/utils/mailer";
import { contactMessage } from "@/utils/templates/mails";

class MessageService {
  public async sendMessage(
    messageInput: SendMessageInterface
  ): Promise<void | Error> {
    const { email, message, name, phone } = messageInput;

    try {
      const contactMail = await generateEmail(
        { email, message, name, phone },
        contactMessage
      );

      const mailSendSuccess = await sendEmail(
        "emma.osademe@gmail.com",
        contactMail,
        "Contact Message"
      );

      if (!mailSendSuccess) {
        throw new Error("Error sending message");
      }
    } catch (e: any) {
      log.error(e.message);
      throw new Error(e.message || "Error sending message");
    }
  }
}

export default MessageService;
