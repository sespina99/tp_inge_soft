import {auth, db} from "../db";



test('prueba log in',  () => {
    return auth.signInWithEmailAndPassword('matruiz@itba.edu.ar', '123456').then(()=>{
        expect(2).toBe(2)
    })

});

test('pruebas username', ()=>{
    return db.collection('users').get().then((users) => {
        for(const doc of users.docs){
            const aux = doc.data()
            expect(aux.username).not.toMatch(/^$/)
        }
    })
})

test('pruebas profilePic', ()=>{
    return db.collection('users').get().then((users) => {
        for(const doc of users.docs){
            const aux = doc.data()
            expect(aux.profilePic).not.toMatch(/^$/)
        }
    })
})

test('pruebas uid', ()=>{
    return db.collection('users').get().then((users) => {
        for(const doc of users.docs){
            const aux = doc.data()
            expect(aux.uid).not.toMatch(/^$/)
        }
    })
})

test('pruebas email', ()=>{
    return db.collection('users').get().then((users) => {
        for(const doc of users.docs){
            const aux = doc.data()
            expect(aux.email).not.toMatch(/^$/)
        }
    })
})

test('pruebas text', ()=>{
    return db.collection('posts').get().then((posts) => {
        for(const doc of posts.docs){
            const aux = doc.data()
            expect(aux.text).not.toMatch(/^$/)
        }
    })
})

test('pruebas date', ()=>{
    return db.collection('posts').get().then((posts) => {
        for(const doc of posts.docs){
            const aux = doc.data()
            expect(aux.datestr).not.toMatch(/^$/)
        }
    })
})

test('pruebas time', ()=>{
    return db.collection('posts').get().then((posts) => {
        for(const doc of posts.docs){
            const aux = doc.data()
            expect(aux.timestr).not.toMatch(/^$/)
        }
    })
})

test('pruebas dateNum', ()=>{
    return db.collection('posts').get().then((posts) => {
        for(const doc of posts.docs){
            const aux = doc.data()
            expect(aux.time).not.toBeNaN()
        }
    })
})

test('pruebas pid', ()=>{
    return db.collection('posts').get().then((posts) => {
        for(const doc of posts.docs){
            const aux = doc.data()
            expect(aux.pid).not.toBeNaN()
        }
    })
})

test('pruebas lastMessageTime', ()=>{
    return db.collection('chats').get().then((chats) => {
        for(const doc of chats.docs){
            const aux = doc.data()
            expect(aux.lastMessageTime).not.toBeNaN()
        }
    })
})
test('pruebas uidFrom', ()=>{
    return db.collection('chats').get().then((chats) => {
        for(const doc of chats.docs){
            const aux = doc.data()
            expect(aux.uidFrom).not.toBeNaN()
        }
    })
})

test('pruebas uidTo', ()=>{
    return db.collection('chats').get().then((chats) => {
        for(const doc of chats.docs){
            const aux = doc.data()
            expect(aux.uidTo).not.toBeNaN()
        }
    })
})

test('pruebas messages', ()=>{
    return db.collection('chats').get().then((chats) => {
        for(const doc of chats.docs){
            const aux = doc.data()
            expect(aux.messages.length).not.toBe(0)
        }
    })
})

test('prueba jest', () => {
    const aux = {
        name: 'rulito',
        estado: 'bien'
    }
    expect(aux).toStrictEqual({
        name: 'rulito',
        estado: 'bien'
    });
});

test('prueba log out',  () => {
    return auth.signOut().then(()=>{
        expect(2).toBe(2)
    })
});