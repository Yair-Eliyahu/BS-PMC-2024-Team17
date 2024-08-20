import React from 'react'
import UploadDoc from '../UploadDoc'
import { auth, signIn } from '@/auth'
import { getUserSubscription } from '@/app/actions/userSubscription'
import UpgradePlan from '../UpgradePlan'
import { getUser } from '@/auth/server'



const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const regSession = await getUser();
  const regUserId = regSession?.id;
  if(session) {
      if(!userId) {
        signIn();
        return;
      }
      const subscribed: boolean | null | undefined = await getUserSubscription({ userId })
    
      
      
    
      return (
        <div className="flex flex-col flex-1">
            <main className="py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24">
              {subscribed ?
              <>
                <h2 className="text-3xl font-bold mb-4">What do you want to be quizzed about today?</h2>
                <UploadDoc />
              </> :
              <UpgradePlan  />
              }
            </main>
        </div>
      )
    } else if(regSession) {
      if(!regUserId) {
        signIn();
        return;
      }
      const regSubscribed: boolean | null | undefined = await getUserSubscription({ regUserId })
    
      
      
    
      return (
        <div className="flex flex-col flex-1">
            <main className="py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24">
              {regSubscribed ?
              <>
                <h2 className="text-3xl font-bold mb-4">What do you want to be quizzed about today?</h2>
                <UploadDoc />
              </> :
              <UpgradePlan  />
              }
            </main>
        </div>
      )
    }
  } 
  

export default page;