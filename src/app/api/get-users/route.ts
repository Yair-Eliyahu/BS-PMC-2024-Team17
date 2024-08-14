import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { ne } from 'drizzle-orm';

export async function GET() {
    try {
        // Fetch all users excluding those with schoolRole "Manager"
        const usersList = await db
            .select()
            .from(users)
            .where(ne(users.schoolRole, 'Manager')); // Use ne (not equal) to filter out "Manager"

        return NextResponse.json({ users: usersList });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}
