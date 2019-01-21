import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Plate = styled.article`
  padding: 20px 0;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  background: #fff;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 20px;
  padding: 0 20px;
`

const Labels = styled.div`
  display: flex;
  padding: 0 20px;
`

const Label = styled.h5`
  letter-spacing: 0.1rem;
  color: #666;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 20px;
  flex: 1;
`

const List = styled.ul`
  list-style: none;
`

const Item = styled.li`
  display: flex;
  padding: 20px 20px;
  position: relative;

  &:hover {
    background: ${p => p.theme.light};

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 3px;
      left: 0;
      top: 0;
      background: ${p => p.theme.main};
    }
  }
`

const Value = styled.span`
  flex: 1;
`

const Board = ({ title, columns, data }) => {
  console.log(data)

  const labels = Object.keys(data[0]).filter(n => !n.startsWith('__'))

  return (
    <Plate>
      <Title>{title}</Title>
      <Labels>
        {labels.map(label => (
          <Label key={label}>{label}</Label>
        ))}
      </Labels>
      <List>
        {data.map(item => (
          <Item key={item.name}>
            {labels.map(label => (
              <Value>{item[label]}</Value>
            ))}
          </Item>
        ))}
      </List>
    </Plate>
  )
}

Board.propTypes = {
  title: PropTypes.string,
}

export default Board
