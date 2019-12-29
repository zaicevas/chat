const toGiftedChatUser = (googleUser) => ({ _id: googleUser.id, name: googleUser.email, avatar: googleUser.photoUrl });

export { toGiftedChatUser };
