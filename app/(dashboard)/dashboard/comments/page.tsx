import { create, getComments } from "@/lib/data/actions";



export default async function Page() {
    const comments = await getComments();

    console.log('comments:', comments);
    return (
        <>
            <h1>DB 연결 테스트</h1>

            <form action={create}>
                <input type="text" placeholder="write a comment" name="comment" />
                <button type="submit">Submit</button>
            </form>
            <div>
                {comments.map((comment: any) => (
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
        </>
        
    );
}

