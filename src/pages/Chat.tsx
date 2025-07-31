import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db, useAuth } from '../context/AuthContext.tsx';
import { MessageProps } from '../types/Props.tsx';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Chat = () => {
    const { userData } = useAuth()
    const [currentMessage, setCurrentMessage] = useState<MessageProps>()

    const handleToggleReadStatus = async (messageToUpdate: MessageProps) => {
    if (!userData.uid) {
      console.error("Користувач не залогінений. Неможливо оновити статус повідомлення.");
      return;
    }

    setCurrentMessage(messageToUpdate)

    const userDocRef = doc(db, 'users', userData.uid);

    try {
      await updateDoc(userDocRef, {
        messageList: arrayRemove(messageToUpdate)
      });

      const updatedMessage = {
        ...messageToUpdate,
        readed: true
      };

      await updateDoc(userDocRef, {
        messageList: arrayUnion(updatedMessage)
      });

      console.log(`Статус повідомлення (ID: ${messageToUpdate.messageId}) змінено на ${updatedMessage.readed}`);

    } catch (error) {
      console.error("Помилка оновлення статусу повідомлення:", error);
      toast.error("Не вдалося оновити статус повідомлення.");
    }
  };

    return (
        <>
            <h1>NEW MESSAGES</h1>
            <div style={{ margin: '20px', maxWidth: '800px', overflowX: 'auto' }}>
      <h2>{userData.messageList?.length === 0 ? 'Any new messages :(' : `My messages - ${userData.messageList?.length}` }</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', minWidth: '250px' }}>Message</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '100px' }}>Readed</th>
          </tr>
        </thead>
        <tbody>
          {userData.messageList?.map((message) => (
            <tr key={message.messageId} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ border: '1px solid #ddd', padding: '12px', cursor: 'pointer' }} className={message.readed || currentMessage?.readed ? 'font-normal' : 'font-bold'}>
                <p onClick={() => handleToggleReadStatus(message)}>{message.message}</p>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  onChange={() => handleToggleReadStatus(message)}
                  checked={message.readed}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
    )
}

export default Chat