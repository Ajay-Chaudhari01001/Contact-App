import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const {isOpen, onClose, onOpen} = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contacList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contacList);
          return contacList;
        })

      } catch (err) {
        console.log(err);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot (contactsRef, (snapshot) => {
      const contacList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filterContacts = contacList.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()));

      setContacts(filterContacts);
      return filterContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex">
          <div className="relative flex flex-grow items-center gap-1">
            <FiSearch className=" absolute ml-1 text-2xl text-white" />
            <input
              type="text"
              onChange={filterContacts}
              className="h-10 flex-grow rounded-md border-2 border-white bg-transparent p-2 pl-10 text-white"
              alt="serch-bar"
            />
            <AiFillPlusCircle onClick={onOpen} className="cursor-pointer text-5xl text-white" />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {contacts.length <=0 ? <NotFound />
           : 
           contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
          }
        </div>
      </div>
        <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
        <ToastContainer position="bottom-center"/>
    </>
  );
};

export default App;
