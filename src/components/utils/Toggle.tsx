import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

type ToggleType = {
  latesSort: boolean;
};

type ToggleBtnProps = {
  currentType: string;
  onToggle: () => void;
};

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 2rem;
  width: 9rem;
  font-size: 14px;
  background-color: white;
  border-radius: 2rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  display: none;
`;

const BtnLabel = styled.label<ToggleType>`
  position: absolute;
  width: 4.5rem;
  height: 2rem;
  border-radius: 2rem;
  background: #315af1;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.16);
  transition: all 0.2s ease-in-out;
  left: ${props => (props.latesSort ? '0' : '4rem')};
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    position: absolute;
    content: ${props => (props.latesSort ? "'주관식'" : "'객관식'")};
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
  }
`;

export const ToggleBtn: React.FC<ToggleBtnProps> = ({ currentType, onToggle }) => {
  const [latesSort, setLatesSort] = useState(true);
  const toggleHandle = () => {
    setLatesSort(prev => !prev);
  };
  return (
    <ToggleWrapper onClick={onToggle}>
      <div style={{ width: '50%', textAlign: 'center', color: 'gray' }}>주관식</div>
      <div style={{ width: '50%', textAlign: 'center', color: 'gray' }}>객관식</div>
      <Checkbox type="checkbox" id="toggleBtn" onChange={toggleHandle} checked={currentType === 'subjective'} />
      <BtnLabel htmlFor="toggleBtn" latesSort={currentType === 'subjective'}></BtnLabel>
    </ToggleWrapper>
  );
};

ToggleBtn.propTypes = {
  currentType: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};