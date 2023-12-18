import { doesConversationExist,createConversation,populateConversation,getUserConversations } from "../services/conversation.service.js"
// import {findUser} from "../services/user.sevices.js"
export const create_open_conversation = async (req, res, next) => {
    console.log(req.body,"create");
    try {
      const sender_id = req.user.userId;
      const { receiver_id, isGroup } = req.body;
      if (isGroup == false) {
        //check if receiver_id is provided
        if (!receiver_id) {
          logger.error(
            "Уучлаарай та харилцах хүний сонгоно уу>"
          );
          throw createHttpError.BadGateway("Уучлаарай алдаа гарлаа дахин оролдоно уу?");
        }
        //chat baina uu ugui yug shalgana
        const existed_conversation = await doesConversationExist(
          sender_id,
          receiver_id,
          false
          
        );
        // chat baival
        if (existed_conversation) {
            
          res.status(200).json({message:"chat baina ",existed_conversation});
        } 
         else {
            // res.send("oks")
          // let receiver_user = await findUser(receiver_id);
          // console.log(receiver_user,"A")

          let convoData = {
            name: "conversation name",
            picture: "conversation picture",
            isGroup: false,
            users: [sender_id, receiver_id],
          };
          // console.log(convoData,"sss")
          const newConvo = await createConversation(convoData);
          const populatedConvo = await populateConversation(
            newConvo._id,
            "users",
            "-password"
          );
          res.status(200).json(populatedConvo);
         }
      } else {
        // console.log("hnaaaaaaaaaa");
        
        const existed_group_conversation = await doesConversationExist(
          "",
          "",
          isGroup
        );
        // console.log(isGroup)
        res.status(200).json(existed_group_conversation);
      }
    } catch (error) {
      next(error);
    }
  };
  export  const getConversations =async(req, res, next)=>{
    try{
        const user_id = req.user.userId;
const conversations =await getUserConversations(user_id)
res.status(200).json(conversations)
    }catch(err){
        next(err)
    }
  }