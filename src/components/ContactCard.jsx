import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import {db} from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclose from "../hooks/useDisclose";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {

  const {isOpen, onClose, onOpen} = useDisclose();

  const deleteContact = async (id) => {
    try{

      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");

    }catch (err){
      console.log(err);
    }
  }
  return (
    <>
    <div
      key={contact.id}
      className="flex items-center justify-between rounded-lg bg-white p-2"
    >
      <div className="flex items-center gap-2">
        <HiOutlineUserCircle className="text-4xl text-black" />
        <div className="">
          <h1 className="font-medium">{contact.name}</h1>
          <p className="text-sm">{contact.phone}</p>
        </div>
      </div>
      <div className="flex gap-2 text-3xl">
        <RiEditCircleLine onClick={onOpen} className="cursor-pointer text-black" />
        <IoMdTrash onClick={ () => deleteContact(contact.id)} className="cursor-pointer text-red-500" />
      </div>
    </div>

    <AddAndUpdateContact isUpdate  contact={contact} isOpen={isOpen} onClose={onClose}  />
    </>
  );
};

export default ContactCard;
