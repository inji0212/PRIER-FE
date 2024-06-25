import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectStore } from '../../../states/projects/ProjectStore';
import {
  AIReportContainer,
  CommentDiv,
  CommentWrapper,
  DetailText,
  FeedbackContainer,
  FeedbackWrapper,
  Img,
  ProfileImg,
  ProjectContainer,
  ProjectDiv,
  QuestionDiv,
  ResponseDiv,
  StaticContainer,
  TitleText,
  UniqueText,
} from './FeedbackStyles';
import { API_BASE_URL } from '../../../const/TokenApi';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import StarRating from '../../../components/utils/StarRating';
import FeedbackAIReport from '../../../components/utils/FeedbackAIReport';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SubjectiveQuestion {
  questionId: number;
  summary: string;
  feedbackCount: number;
  category: 'SUBJECTIVE';
  questionContent: string;
}

interface ObjectiveQuestion {
  questionId: number;
  veryGood: number;
  good: number;
  soso: number;
  bad: number;
  veryBad: number;
  feedbackCount: number;
  category: 'OBJECTIVE';
  questionContent: string;
}
type Question = SubjectiveQuestion | ObjectiveQuestion;

interface CommentData {
  commentId: number;
  content: string;
  isMine: boolean;
  score: number;
  userId: number;
  userName: string;
  profileUrl: string;
}

function Feedback() {
  const { projectId } = useParams<{ projectId: string }>();
  const setProjectId = useProjectStore(state => state.setProjectId);
  const [title, setTitle] = useState('');
  const [teamName, setTeamName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [mainImgUrl, setMainImgUrl] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [amount, setAmount] = useState<number[]>([]);
  const [percents, setPercents] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId); // URL 파라미터로부터 projectId를 상태로 설정
    }
  }, [projectId, setProjectId]);

  const handleGetInfo = async () => {
    try {
      const response = await API_BASE_URL.get(`/projects/${projectId}/responses`);
      const response1 = await API_BASE_URL.get(`/projects/${projectId}`);
      const Data = response.data;
      const Data1 = response1.data;
      console.log(Data);
      setTitle(Data.title);
      setTeamName(Data.teamName);
      setIntroduce(Data.introduce);
      setMainImgUrl(Data.projectImage);
      setPercents(Data.percentage);
      setAverageScore(Data.averageScore);
      setAmount(Data1.amount);
      setComments(Data.commentWithProfileDtoList);
      setKeywords(Data.keyWordResponseDtoList);

      const subjectiveQuestions = Data.chatGpt.map((q: any) => ({
        questionId: q.question_id,
        summary: q.summary,
        feedbackCount: q.feedbackCount,
        questionContent: q.questionContent,
        category: 'SUBJECTIVE' as const,
      }));

      const objectiveQuestions = Data.responseObjectiveDtoList.map((q: any) => ({
        questionId: q.questionId,
        veryGood: q.veryBad,
        good: q.bad,
        soso: q.soso,
        bad: q.good,
        veryBad: q.veryGood,
        feedbackCount: q.feedbackCount,
        questionContent: q.questionContent,
        category: 'OBJECTIVE' as const,
      }));

      const allQuestions = [...subjectiveQuestions, ...objectiveQuestions];
      allQuestions.sort((a, b) => a.questionId - b.questionId);

      setQuestions(allQuestions);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetInfo();
  }, [projectId]);

  // if (!title || !teamName || !introduce) {
  //   return <div>Loading...</div>;
  // }
  const calculatePercent = (value: number, total: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(2) : 0;
  };

  const renderObjectiveQuestionChart = (question: ObjectiveQuestion) => {
    const totalResponses = question.veryGood + question.good + question.soso + question.bad + question.veryBad;
    const data = {
      labels: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'],
      datasets: [
        {
          label: 'Responses',
          data: [question.veryGood, question.good, question.soso, question.bad, question.veryBad],
          backgroundColor: [
            '#315AF1', // 진한 파란색
            '#315AF170', // 중간 회색
            '#B0B0B0', // 더 연한 회색
            '#D3D3D3', // 더 연한 회색
            '#E0E0E0', // 거의 흰색에 가까운 회색
          ],
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    return <Pie data={data} options={options} />;
  };
  return (
    <FeedbackWrapper>
      <ProjectDiv>
        <ProjectContainer>
          <span style={{ color: '#315AF1', fontWeight: 'bold' }}>프로젝트: {title}</span>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>팀: {teamName}</span>
          <p
            className="mt-2"
            style={{
              fontSize: '14px',
              color: '#828282',
              fontWeight: 'bold',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2, // 원하는 줄 수로 조정
              lineHeight: '1.2em', // 줄 높이 설정
              maxHeight: '3.6em', // lineHeight * WebkitLineClamp
            }}
          >
            {teamDescription}
          </p>
          {mainImgUrl && <Img className="mt-2" src={mainImgUrl} alt={title} />}

          <span className="mt-2" style={{ fontSize: '18px', fontWeight: 'bold' }}>
            상세:{' '}
          </span>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              height: '20%',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              lineHeight: '1.2em',
              maxHeight: '3.6em',
            }}
          >
            {introduce}
          </p>
          <Link
            to={`/responsetest/${projectId}`}
            style={{
              marginLeft: 'auto',
              paddingRight: '10px',
              cursor: 'pointer',
              fontSize: '12px',
              marginTop: 'auto',
              color: '#828282',
            }}
          >
            <span className="underline">자세히 보기 &gt;</span>
          </Link>
        </ProjectContainer>
        <AIReportContainer>
          <FeedbackAIReport keyWordResponseDtoList={keywords} />
        </AIReportContainer>
        <div style={{ display: 'flex', flexDirection: 'column', width: '40%', gap: '15px' }}>
          <FeedbackContainer>
            <div style={{ display: 'flex', flexDirection: 'column', width: '30%', gap: '5px' }}>
              <TitleText>제출된 피드백</TitleText>
              <UniqueText>{amount[2] || 0}</UniqueText>
            </div>
            <div
              style={{
                display: 'flex',
                width: '70%',
                alignItems: 'center',
              }}
            >
              <DetailText>
                {amount[0] || 0}명의 유저에게 댓글과 별점을 받았습니다.
                <br />
                {amount[1] || 0}명의 유저가 상세 응답에 응했습니다.
              </DetailText>
            </div>
          </FeedbackContainer>
          <StaticContainer>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex ', alignItems: 'center' }}>
                <TitleText>통계</TitleText>
                <UniqueText className="ml-3" style={{ fontSize: '25px' }}>
                  긍정의 응답 {percents}%
                </UniqueText>
              </div>
              <DetailText className="ml-3 mb-1" style={{ display: 'flex', alignItems: 'flex-end' }}>
                평점 {averageScore}점의 별점을 받았습니다
              </DetailText>
            </div>
          </StaticContainer>
        </div>
      </ProjectDiv>
      <span className="mt-5 font-bold" style={{ color: '#315AF1' }}>
        상세 응답 분석
      </span>
      <ResponseDiv>
        {questions.length === 0 && (
          <div
            style={{
              marginTop: '100px',
              marginBottom: '100px',
              color: '#888',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              fontSize: '18px',
            }}
          >
            <p>작성됩 응답이 없습니다</p>
          </div>
        )}
        {questions.map((question, index) => {
          const totalResponses =
            question.category === 'OBJECTIVE'
              ? question.veryGood + question.good + question.soso + question.bad + question.veryBad
              : 0;

          return (
            <QuestionDiv key={question.questionId} className="mt-4">
              {question.category === 'SUBJECTIVE' ? (
                <div>
                  <div style={{ display: 'flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                    {index + 1}번 문항
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <span
                        style={{
                          marginLeft: '20px',
                          fontSize: '22px',
                          outline: 'none',
                          width: 'auto',
                        }}
                      >
                        {question.questionContent}
                      </span>
                      <span className="ml-5" style={{ fontSize: '12px', color: '#828282' }}>
                        응답 {question.feedbackCount}개
                      </span>
                    </div>
                  </div>
                  {question.feedbackCount > 0 && (
                    <p style={{ marginLeft: '60px', fontSize: '18px', padding: '20px' }}>{question.summary}</p>
                  )}
                </div>
              ) : (
                <div>
                  <div style={{ display: 'inline-flex', fontSize: '15px', alignItems: 'center', fontWeight: 'bold' }}>
                    {index + 1}번 문항
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <span
                        style={{
                          marginLeft: '20px',
                          fontSize: '22px',
                          outline: 'none',
                          width: 'auto',
                        }}
                      >
                        {question.questionContent}
                      </span>
                      <span className="ml-5" style={{ fontSize: '12px', color: '#828282' }}>
                        응답 {question.feedbackCount}개
                      </span>
                    </div>
                  </div>
                  {question.feedbackCount > 0 && (
                    <div
                      style={{ marginLeft: '60px', fontSize: '18px', outline: 'none', width: '80%', padding: '20px' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ width: '150px' }}>{renderObjectiveQuestionChart(question)}</div>
                        <div
                          style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            fontSize: '12px',
                            justifyContent: 'flex-end',
                            marginLeft: '50px',
                            lineHeight: '16px',
                            color: '#828282',
                          }}
                        >
                          <p>매우 좋음: {calculatePercent(question.veryGood, totalResponses)}%</p>
                          <p>좋음: {calculatePercent(question.good, totalResponses)}%</p>
                          <p>보통: {calculatePercent(question.soso, totalResponses)}%</p>
                          <p>나쁨: {calculatePercent(question.bad, totalResponses)}%</p>
                          <p>매우 나쁨: {calculatePercent(question.veryBad, totalResponses)}%</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </QuestionDiv>
          );
        })}
      </ResponseDiv>
      <span className="mt-5 font-bold" style={{ color: '#315AF1' }}>
        댓글
      </span>
      <CommentDiv $isEmpty={comments.length === 0}>
        {comments.length === 0 ? (
          <div
            style={{
              marginTop: '100px',
              marginBottom: '100px',
              color: '#888',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              fontSize: '18px',
            }}
          >
            <p>작성된 댓글이 없습니다</p>
          </div>
        ) : (
          comments.map(comment => (
            <CommentWrapper key={comment.commentId}>
              <p
                title={comment.content}
                dangerouslySetInnerHTML={{ __html: comment.content.replace(/\n/g, '<br />') }}
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  lineHeight: '1.2em',
                  maxHeight: '3.6em',
                  overflow: 'hidden',
                }}
              ></p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                }}
              >
                <ProfileImg src={comment.profileUrl}></ProfileImg>
                <strong className="ml-1">{comment.userName}</strong>
                <StarRating initialScore={comment.score} readOnly={true} onHover={false} />
              </div>
            </CommentWrapper>
          ))
        )}
      </CommentDiv>
    </FeedbackWrapper>
  );
}

export default Feedback;
