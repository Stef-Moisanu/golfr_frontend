import { useRouter } from 'next/router'
import ScoreCard from '../../../components/ScoreCard'
import Layout from '../../../components/Layout'
import useScoresByUser from '../../../lib/useScoresByUser'

const Golfers = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useScoresByUser(id)
  if (!data) { return null }
  return (
    <Layout>
      <>
        {error ? (
          error
        ) : (
          <>
            <h1>{`Golfer: ${data?.name}`}</h1>
            {data?.scores && data?.scores?.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={data.name}
              />
            ))}
          </>
        )}
      </>
    </Layout>
  )
}

export default Golfers
