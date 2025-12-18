import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyAjki6Mm9_9A_8X4ztG3DB8QLoqlNvQYGY",
  authDomain: "van-life-38058.firebaseapp.com",
  projectId: "van-life-38058",
  storageBucket: "van-life-38058.firebasestorage.app",
  messagingSenderId: "530020513830",
  appId: "1:530020513830:web:071ebfb192131a5ce70ee7"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vanCollectionRef = collection(db, "vans")


export async function getVans(){
    const querySnapShot = await getDocs(vanCollectionRef)
    const dataArr = querySnapShot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id

    }))
    console.log(dataArr)
    return dataArr

} 

// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}