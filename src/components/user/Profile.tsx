import React from 'react';
import { Link } from 'react-router-dom';
import {
  Filler,
  LinkText,
  MiddleText,
  PointText,
  ProfileContainer,
  ProgressBarContainer,
  StyledPointIcon,
  Title,
} from './UserStyle';
import { useUserStore } from '../../states/user/UserStore';
import { userPointStore } from '../../states/user/PointStore';
import Coin from '../../assets/Coin.png';
import { device } from '../../styles/Media';

export default function Profile() {
  const userProfile = useUserStore(state => state.userProfile);
  const pointStore = userPointStore();
  const progressTrans = (rank: string): number => {
    switch (rank) {
      case 'ROOKIE':
        return 35;
      case 'JUNIOR':
        return 70;
      case 'SENIOR':
        return 100;
      default:
        return 0;
    }
  };
  const progress = progressTrans(userProfile.rank);
  const NickName = sessionStorage.getItem('nickname');

  return (
    <ProfileContainer>
      {device.small ? (
        <div className="flex-col ">
          <Title>반갑습니다 {NickName} 님</Title>
          <Link to="/mypage">
            <LinkText className="text-end mb-3">마이 페이지 &gt;</LinkText>
          </Link>
        </div>
      ) : (
        <div className="flex justify-between items-center gap-10 mb-3">
          <Title>반갑습니다 {NickName} 님</Title>
          <Link to="/mypage">
            <LinkText>마이 페이지 &gt;</LinkText>
          </Link>
        </div>
      )}

      <ProgressBarContainer>
        <Filler percentage={progress} />
      </ProgressBarContainer>
      <MiddleText>
        등급 <span className="text-[#315AF1]">{userProfile.rank}</span>
      </MiddleText>
      <div className="flex-col">
        <div className="flex items-center gap-3">
          <StyledPointIcon src={Coin} />
          <MiddleText>코어</MiddleText>
        </div>
        <PointText className="text-center">{pointStore.point} 코어 보유</PointText>
        <Link to="/store">
          <LinkText className="text-right">상점 바로가기 &gt;</LinkText>
        </Link>
      </div>
    </ProfileContainer>
  );
}
