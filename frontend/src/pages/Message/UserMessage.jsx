import { Box, Typography } from "@mui/material";
import React, { createRef, useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import UserImage from "../../components/UI/UserImage";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { MessageBox } from "react-chat-elements";
import { Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { Button } from "react-chat-elements";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../store/User/userAction";
//import firebase from 'firebase/app';
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
// import { getAuth } from "firebase/auth";
import {
  useCollection,
} from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
//import { firebase } from "../../firebase";

// const auth = getAuth();
//const auth = getAuth(firebase);
// firebase.initializeApp({
//   apiKey: "AIzaSyB2kgkhOZ8tVjUE3Wwi5B9NMBLOAaKkKQQ",
//   authDomain: "chat-de838.firebaseapp.com",
//   projectId: "chat-de838",
//   storageBucket: "chat-de838.appspot.com",
//   messagingSenderId: "918082947374",
//   appId: "1:918082947374:web:1968dfb7ff3fe7bf5f52bf",
//   measurementId: "G-0YMX394E81"
// })

// const auth = firebase.auth;
// const firestore = firebase.firestore();
// const analytics = firebase.analytics();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //padding: theme.spacing(3),
  //textAlign: "center",
  fontWeight: "bold",
  color: theme.palette.text.secondary,
}));

const UserMessage = ({ id }) => {
  //const [user] = useAuthState(auth);
  const [sendMessage, setSendMessage] = useState("");
  const messageRef = createRef();
  const dummy = useRef();

  //const {user} = useSelector((state) => state.User);
  // const docRef = doc(db,`messages/${id+userData?.user?.detail?._id}`);

  // const docSnap = getDoc(docRef);
  // docSnap.then((data) => {
  //   console.log("Document data:", data.data());
  // })

  //setDoc(docRef,{ capital: true },)

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  //setDoc(docRef, {})
  //.collection("637c9660de573f5290f5123e637c9421b0337f3a00ad8edc")

  // const docRef1 = doc(db, `637c9660de573f5290f5123e637c9421b0337f3a00ad8edc`);
  // const docSnap = getDoc(docRef1);
  // docSnap.then((data) => {
  //   if (data.exists()) {
  //     console.log("Document data:", data.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // })
  const q = query(
    collection(db, `${id + localStorage.getItem("userId")}`),
    orderBy("createAt")
  );

  const q1 = query(
    collection(db, `${localStorage.getItem("userId") + id}`),
    orderBy("createAt")
  );

  const [value] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [value1] = useCollection(q1, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  console.log(value, " === ", value1);
  // value.forEach((doc) => {

  // })
  //console.log(value?.docs, "eeeee", loading, "ssss", error, "ppp");
  // value?.forEach((doc) => {
  //   console.log(doc.data(), "2233");
  //   //result = [...result,doc.data()];
  // });

  // const messagesRef = query(collection(db,`${id+userData?.user?.detail?._id}`));
  //   //const query2 = messagesRef.orderBy('createdAt').limit(25);

  //   const [messages] = useCollectionData(Firestore.Query, { idField: 'id' });
  //   console.log(messages,"ssss");

  // const q = query(collection(db,`${id+userData?.user?.detail?._id}`));
  // // const [values, loading, error, snapshot] =
  // //   useCollectionData(q);
  // // //const [messages] =useDocumentData(q);
  // // console.log(values,"eeeee",loading,"ssss",error,"ppp",snapshot);

  // //const q = query(collection(db,`${id+userData?.user?.detail?._id}`));
  // const querySnapshot = getDocs(q);
  // querySnapshot.then((data) => {
  //   var result = [];
  //   data.forEach((doc) => {
  //     console.log(doc.data().createAt.toDate(),"2233");
  //     result = [...result,doc.data()];
  //   })

  //   console.log("Result : ",result);
  // })

  // querySnapshot.((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  //addDoc(collection(db,`${id+userData?.user?.detail?._id}`),{ sendId:"12",receiveId: id,createAt: Timestamp.fromDate(new Date()), body: "Hello12"  })

  //setDoc(docRef, { sendId:"12",receiveId: id,createAt: Timestamp.fromDate(new Date()), body: "Hello12"  },{merge: true});
  //const messagesRef = db.collection('messages');
  //var user = 0;
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  const dispatch = useDispatch();
  const { userMessageDetail, detail } = useSelector((state) => state.User);

  // if (!user) {
  //   //user =1;
  //   //const auth = getAuth();
  //   signInWithEmailAndPassword(auth, "talhatanveer930@gmail.com", "12345678")
  //     .then((userCredential) => {
  //       // Signed in
  //       const result = userCredential.user;
  //       console.log(result, "yyyy");
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // }

  const messageHandle = async () => {
    const ref = query(collection(db, `${id + localStorage.getItem("userId")}`));
    const docSnap = await getDocs(ref);
    if (docSnap.docs.length > 0) {
      addDoc(collection(db, `${id + localStorage.getItem("userId")}`), {
        sendId: localStorage.getItem("userId"),
        receiveId: id,
        createAt: Timestamp.fromDate(new Date()),
        body: sendMessage,
        readStatus: false,
      });
      setSendMessage("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
      messageRef.current.value = "";
    } else {
      addDoc(collection(db, `${localStorage.getItem("userId") + id}`), {
        sendId: localStorage.getItem("userId"),
        receiveId: id,
        createAt: Timestamp.fromDate(new Date()),
        body: sendMessage,
        readStatus: false,
      });
      setSendMessage("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
      messageRef.current.value = "";
    }
  };

  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [dispatch, id]);

  return (
    <Grid container xs={8} direction="row">
      <Grid item xs={12}>
        <Item>
          <Box
            gap="1rem"
            flexDirection="row"
            display="flex"
            padding="8px"
            alignItems="center"
          >
            <UserImage image={userMessageDetail?.profilePic} size="50px" />
            <Box>
              <Typography variant="h4" color={main} fontWeight="500">
                {userMessageDetail?.name}
              </Typography>
              <Typography color={medium}>Active</Typography>
            </Box>
          </Box>
        </Item>
      </Grid>
      <Grid
        xs={12}
        item
        style={{ overflowY: "scroll" }}
        maxHeight="530px"
        minHeight="530px"
      >
        {value?.docs?.length > 0
          ? value?.docs?.map((doc) => (
              <MessageBox
                position={doc.data().sendId === id ? "left" : "right"}
                title={
                  doc.data().sendId === id
                    ? userMessageDetail?.name
                    : detail?.name
                }
                type="text"
                text={doc.data().body}
                titleColor={dark}
                className="messageStyle"
                status="read"
                date={doc.data().createAt.toDate()}
              />
            ))
          : value1?.docs?.map((doc) => (
              <MessageBox
                position={doc.data().sendId === id ? "left" : "right"}
                title={
                  doc.data().sendId === id
                    ? userMessageDetail?.name
                    : detail?.name
                }
                type="text"
                text={doc.data().body}
                titleColor={dark}
                className="messageStyle"
                status="read"
                date={doc.data().createAt.toDate()}
              />
            ))}
        <span ref={dummy}></span>
      </Grid>

      <Grid xs={12} item>
        <Input
          //className="SendMessage"
          placeholder="Type here..."
          referance={messageRef}
          multiline={false}
          //onReset={}
          //value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          rightButtons={
            <Button text={"Send"} onClick={messageHandle} title="Send" />
          }
        />
      </Grid>
    </Grid>
  );
};

export default UserMessage;
