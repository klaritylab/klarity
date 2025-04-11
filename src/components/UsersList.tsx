import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type User = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
};

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'User 97ae',
    avatar: 'DF',
    isOnline: true,
  }
];

const UsersList = () => {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">onlineUsers</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {MOCK_USERS.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-chatpdf-purple text-white">{user.avatar}</AvatarFallback>
                </Avatar>
                {user.isOnline && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersList;
