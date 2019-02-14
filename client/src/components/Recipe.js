import React, { useRef } from 'react'
import { useWindowSize, useMeasure } from '../hooks'
import styled, { css } from 'styled-components'
import { useTransition, useSpring, animated, config } from 'react-spring'
import PropTypes from 'prop-types'

export const Card = styled(animated.div)`
  background: #fff;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  background: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: ${p => (p.maximized ? 0 : '10px')};
  z-index: ${p => (p.maximized ? 10 : 1)};

  /* &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    box-shadow: inset 0px 4px 16px rgba(0, 0, 0, 0.16);
  } */
`

const Inner = styled(animated.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  transform-origin: 50% 500%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Image = styled.div`
  position: relative;
  background-image: url(${p => p.url});
  background-size: cover;
  background-color: #eee;
  width: 100%;
  flex: 1;
  max-height: 50vh;

  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 150%;
    height: 25%;
    border-radius: 100%;
    background: #fff;
    transform: translate(-50%, -15%);
  }

  ${p => p.maximized && css``}
`

const Content = styled.div`
  padding: 20px;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 1.5em;
  font-family: ${p => p.theme.fonts.body};
  font-weight: 600;
  line-height: 1.125;
  margin-bottom: 1rem;

  ${p => p.theme.media.mobile.up`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`

const InfoList = styled.ul``

const Info = styled.li`
  display: inline-block;
  /* color: ${p => p.theme.main}; */
  color: #777;
  font-weight: 700;
  font-size: 1rem;

  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }

  &:not(:first-of-type) {
    position: relative;

    &::before {
      content: '•';
      margin-right: 0.5rem;
    }
  }
`

const Fullscreen = styled(animated.div)`
  padding: 20px;
`

const FullscreenContent = styled.div``

const IngredientsTitle = styled.h2``

const Section = styled.article``

const SectionName = styled.h3``

const Ingredients = styled.ul``

const Ingredient = styled.li``

const Recipe = ({ frozen, maximize, maximized, i, recipe }) => {
  const ref = useRef(null)

  const transition = useTransition(recipe, recipe.id, {
    from: { opacity: 0, transform: `rotate(-15deg)` },
    enter: { opacity: 1, transform: `rotate(0deg)` },
    leave: { opacity: 0, transform: `rotate(15deg)` },
    unique: true,
    initial: false,
    config: config.stiff,
  })

  const { width: innerWidth, height: innerHeight } = useWindowSize()

  const top = 114
  const width = innerWidth - 60
  const height = innerHeight - (70 + 38 + 48 + 15 + top)

  const [style, set] = useSpring(() => ({
    width,
    height,
    top,
  }))

  set({
    width: maximized ? innerWidth : width,
    height: maximized ? innerHeight : height,
    top: maximized ? 0 : top,
  })

  const isMaximized = maximized ? 'true' : undefined

  const [bind, { height: fullScreenHeight }] = useMeasure()

  const fullRecipe = useTransition(maximized, null, {
    from: { opacity: 0, height: 0, padding: '0 20px' },
    enter: { opacity: 1, height: fullScreenHeight, padding: '20px 20px' },
    leave: { opacity: 0, height: 0, padding: '0 20px' },
  })

  return (
    <Card
      maximized={isMaximized}
      style={style}
      onClick={() => maximize(recipe.id)}
      frozen={frozen.toString()}
      ref={ref}
    >
      {transition.map(
        ({
          item: { image, title, time, difficulty, numberOfIngredients },
          props,
          key,
        }) => (
          <Inner key={key} style={props}>
            <Image maximized={isMaximized} url={image} />
            <Content>
              <Title>{title}</Title>
              <InfoList>
                <Info>{time} min</Info>
                <Info>{difficulty}</Info>
                <Info>{numberOfIngredients} ingredienser</Info>
              </InfoList>
            </Content>
            {fullRecipe.map(
              ({
                item: isFullscreen,
                props: fullScreenProps,
                key: fullscreenKey,
              }) =>
                isFullscreen && (
                  <Fullscreen style={fullScreenProps} key={fullscreenKey}>
                    <FullscreenContent {...bind}>
                      <IngredientsTitle>Ingredienser</IngredientsTitle>
                      {recipe.sections.map(section => (
                        <Section>
                          {section.name && (
                            <SectionName>{section.name}</SectionName>
                          )}
                          <Ingredients>
                            {section.ingredients.map(ingredient => (
                              <Ingredient>{ingredient.item.name}</Ingredient>
                            ))}
                          </Ingredients>
                        </Section>
                      ))}
                    </FullscreenContent>
                  </Fullscreen>
                )
            )}
          </Inner>
        )
      )}
    </Card>
  )
}

Recipe.propTypes = {
  frozen: PropTypes.bool,
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.number,
    difficulty: PropTypes.string,
    numberOfIngredients: PropTypes.number,
  }),
}

export default Recipe
