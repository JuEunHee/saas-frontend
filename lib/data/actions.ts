import { neon } from '@neondatabase/serverless';


const sql = neon(`${process.env.POSTGRES_URL}`);

export async function create(formData: FormData) {
    'use server';
    // Connect to the Neon database

    const comment = formData.get('comment');
    // Insert the comment from the form into the Postgres database
    await sql`INSERT INTO comments (comment) VALUES (${comment})`;
}


export async function getComments() {
    try {
      const comments = await sql`SELECT * FROM public.comments`;

      return comments;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
