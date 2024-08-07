import { styled } from 'styled-components';
import { device } from '../../../styles/Media';

//프로필
export const ProfileWapper = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  margin-bottom: 1.25rem;
  ${device.small} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  ${device.small} {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const ProfileImgContainer = styled.div`
  position: relative;
  width: 20rem;
  height: 14rem;
  border: 0.7px solid #e0e0e0;
  border-radius: 50%;
  overflow: hidden;
  &:hover .edit-overlay {
    opacity: 1;
  }
  ${device.small} {
    width: 7rem;
    height: 7rem;
  }
`;

export const StyledProfile = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 50%;
  object-fit: cover;
`;
export const EditOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 50%;
`;
export const EditingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  border-radius: 50%;
`;
export const ProfileTextContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-bottom: 10px;
`;
export const ProfileText = styled.h2`
  font-size: 19px;
  font-weight: 600;
  margin-right: 20px;
  cursor: default;
  ${device.small} {
    font-size: 14px;
    margin-right: 10px;
  }
`;
export const ProfileDetail = styled.p`
  font-size: 19px;
  font-weight: 500;
  margin-right: 20px;
  cursor: default;
  ${device.small} {
    font-size: 14px;
    margin-right: 10px;
  }
`;
export const CorrectText = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #828282;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    color: #5a4d43;
    font-weight: 400;
  }
  ${device.small} {
    font-size: 11px;
    margin-right: 10px;
  }
`;
export const EditAccountText = styled.p`
  cursor: pointer;
`;
export const StyledInput = styled.input`
  font-size: 18px;
  border-bottom: 1px solid #828282;
  background: transparent;
  &:focus {
    outline: none;
    border-bottom: 1.5px solid #4188fe;
    transition: 0.2s;
  }
  ${device.small} {
    font-size: 12px;
  }
`;
export const ProfileAccountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  width: 100%;
`;
export const AccountLink = styled.a`
  display: flex;
  cursor: pointer;
`;
interface AccountIconProps {
  hasHref?: boolean;
}
export const AccountIcon = styled.img<AccountIconProps>`
  filter: ${({ hasHref }) => (hasHref ? 'none' : 'blur(0.5px)')};
  width: 2.8rem;
  ${device.small} {
    width: 1.8rem;
  }
`;
export const AccountGithub = styled.img<AccountIconProps>`
  filter: ${({ hasHref }) => (hasHref ? 'none' : 'blur(0.5px)')};
  width: 2.4rem;
  border: none;
  border-radius: 10px;
  ${device.small} {
    width: 1.4rem;
  }
`;
//자기소개
export const IntroduceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  ${device.small} {
    width: 100%;
  }
`;
export const IntroduceText = styled.p`
  font-weight: 600;
  font-size: 22px;
  ${device.small} {
    font-size: 16px;
  }
`;
export const IntroduceContainer = styled.div`
  height: 40%;
  max-height: 40%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 15px;
  margin-left: 20px;
  padding: 20px;
  background-color: #e6f3ff;
  ${device.small} {
    width: 100%;
    margin-left: 0px;
    margin-top: 10px;
  }
`;
//퀘스트
export const SubTitle = styled.p`
  font-size: 20px;
  margin-bottom: 1rem;
  cursor: pointer;
  ${device.small} {
    font-size: 16px;
  }
`;
export const QuestContainer = styled.div`
  height: 54%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-left: 20px;
  padding: 20px;
  ${device.small} {
    width: 100%;
    height: 20%;
    margin-left: 0px;
  }
`;
export const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const StepLabel = styled.div<{ completed?: boolean }>`
  font-size: 17px;
  margin-bottom: 8px;
  color: ${({ completed }) => (completed ? '#000' : '#ccc')};
  ${device.small} {
    font-size: 12px;
  }
`;

export const StepCircle = styled.div<{ completed?: boolean; color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ completed, color }) => (completed ? color : '#ccc')};
  margin-bottom: 8px;
  ${device.small} {
    width: 10px;
    height: 10px;
  }
`;

export const StepLine = styled.div`
  flex: 1;
  height: 1px;
  color: #828282;
  background-color: #828282;
`;

//프로젝트 컨테이너
export const ProjectWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 60%;
  ${device.small} {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
  }
`;
export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;
  margin-right: 20px;
  box-sizing: border-box;
  ${device.small} {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-right: 0;
  }
`;
export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  ${device.small} {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }
`;
//최근 프로젝트 링크
export const LinkWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  ${device.small} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const LinkProject = styled.div`
  height: 7rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: white;
  box-shadow: 2px 6px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
  margin-right: 20px;
  box-sizing: border-box;
  ${device.small} {
    width: 100%;
    height: 8rem;
    margin-right: 0;
    margin-bottom: 0;
  }
`;
export const LinkProjectText = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${device.small} {
    font-size: 14px;
  }
`;
//피드백 수
export const FeedbackContainer = styled.div`
  height: 14.5rem;
  display: flex;
  flex-direction: column;
  background-color: #e8e0f1;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-right: 20px;
  box-sizing: border-box;
  gap: 10px;
  ${device.small} {
    width: 60%;
    height: 8rem;
    margin-right: 0;
    margin-left: 10px;
  }
`;
//통계
export const StaticContainer = styled.div`
  background-color: #f3f5fb;
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 23rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-right: 20px;
  cursor: default;
  box-sizing: border-box;
  ${device.small} {
    width: 100%;
    height: 12.5rem;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;
export const StaticOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 21.5rem;
  border: none;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #828282;
  z-index: 3;
  ${device.small} {
    width: 100%;
    height: 11.5rem;
    font-size: 15px;
  }
`;

export const AIReportContainer = styled.div`
  background-color: #e1f9f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 23rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 10px 20px;
  cursor: default;
  box-sizing: border-box;
  ${device.small} {
    width: 100%;
    height: 17rem;
  }
`;
export const AIBestText = styled.h1`
  color: #315af1;
  font-weight: 600;
  font-size: 1.2em;
  ${device.small} {
    font-size: 15px;
  }
`;
export const ReviewWrapper = styled.div`
  cursor: defualt;
  display: flex;
  flex-direction: column;
  height: 28.5rem;
  overscroll-behavior: none;
  overflow-y: scroll;
  width: 30%;
  box-sizing: border-box;
  gap: 1rem;
  ${device.small} {
    width: 100%;
  }
`;
export const TitleText = styled.h2`
  font-weight: 700;
  font-size: 20px;
  ${device.small} {
    font-size: 14px;
  }
`;
export const DetailText = styled.p`
  color: #828282;
  font-size: 16px;
  ${device.small} {
    font-size: 12px;
  }
`;
export const UniqueText = styled.h1`
  font-weight: 700;
  font-size: 30px;
  ${device.small} {
    font-size: 20px;
  }
`;
export const MypageChartIcon = styled.img`
  width: 40%;
  height: 45%;
  transform: scaleX(-1);
  align-self: flex-end;
  ${device.small} {
    width: 5rem;
    height: 5rem;
  }
`;
export const StyledGraphIcon = styled.img`
  margin-left: 1%;
  width: 11%;
  height: 11%;
`;

export const EmptyContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: white;
  width: 22rem;
  height: 9rem;
  padding: 20px;
  box-sizing: border-box;
  ${device.small} {
  }
`;
