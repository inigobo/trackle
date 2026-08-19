import { WelcomeCard } from '@/src/ui/components/WelcomeCard'
import { createClient } from '@/utils/supabase/serverProps'
import { Group } from '@/src/application/group'
import { styled } from '@stitches/react'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Link from 'next/link'
import applicationServicesMap from '../config/applicationServicesMap'
import { GroupList } from '../ui/components/GroupList/GroupList'
import { HomeLayoutStyles } from './Home.styles'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context)

  const { data } = await supabase.auth.getUser()

  const user = data.user

  let groups: Group[]

  if (!user) {
    groups = []
  } else {
    groups = await applicationServicesMap
      .getAllGroupsForUser()
      .run(data.user.id)
  }

  return { props: { user, groups } }
}

export default function Home({
  user,
  groups,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <HomeLayout>
      <WelcomeCard />
      {user ? (
        <GroupList groups={groups} />
      ) : (
        <Link
          href="/login"
          className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Iniciar sesión
        </Link>
      )}
    </HomeLayout>
  )
}

const HomeLayout = styled('div', HomeLayoutStyles)
