import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(request: Request) {
    try {
        const { userId, role } = await request.json();

        if (!userId || !role) {
            return NextResponse.json({ error: 'Missing userId or role' }, { status: 400 });
        }

        const validRoles = ['Student', 'Educator', 'Manager'];
        if (!validRoles.includes(role)) {
            return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        // Update user role
        const updateResult = await db
            .update(users)
            .set({ schoolRole: role })
            .where(eq(users.id, userId));

        // Check if any row was updated
        if (updateResult === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating user role:', error);
        return NextResponse.json({ error: 'Error updating user role' }, { status: 500 });
    }
}
