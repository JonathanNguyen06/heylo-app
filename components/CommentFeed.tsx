"use client";

import { db } from "@/firebase";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Comment from "@/components/Comment";

interface CommentFeedProps {
  postId: string;
}

export default function CommentFeed({ postId }: CommentFeedProps) {
  console.log("fethching comments for post: ", postId);

  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);

  useEffect(() => {
    const q = query(collection(db, "posts", postId, "comments"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const snapshotDocs = snapshot.docs;

      setComments(snapshotDocs);
    });

    return unsubscribe;
  }, [postId]);

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment.data()} id={comment.id} />
      ))}
    </>
  );
}
