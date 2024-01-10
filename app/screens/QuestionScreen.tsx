import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Alert, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, ListView, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { Question, useStores } from "app/models"
import { decodeHTMLEntities } from "app/utils/decodeHtml"
import { ContentStyle } from "@shopify/flash-list"
import { RadioGroup } from "react-native-radio-buttons-group"

interface QuestionScreenProps extends AppStackScreenProps<"Question"> {}

export const QuestionScreen: FC<QuestionScreenProps> = observer(function QuestionScreen() {
  // Are we refreshing the data?
  const [refreshing, setRefreshing] = React.useState(false)

  // Pull in one of our MST stores
  const { questionStore } = useStores()
  const { questions } = questionStore

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    setRefreshing(true)
    await questionStore.getQuestions()
    setRefreshing(false)
  }

  const onPressAnswer = (question: Question, guess: string) => {
    question.setGuess(guess)
  }

  const checkAnswer = (question: Question) => {
    if (question.isCorrect) {
      Alert.alert("Correct!")
    } else {
      Alert.alert(`Wrong! The correct answer is ${question.correctAnswer}`)
    }
  }

  const QuestionComponent = ({ question }: { question: Question }) => {
    return (
      <View style={$questionWrapper}>
        <Text style={$question} text={decodeHTMLEntities(question.question || "")} />
        <RadioGroup
          radioButtons={question.allAnswers.map((answer) => ({
            id: answer,
            label: answer,
            color: colors.text,
            labelStyle: $answer,
          }))}
          onPress={(guess) => onPressAnswer(question, guess)}
          selectedId={question.guess}
        />
        <Button style={$checkAnswer} onPress={() => checkAnswer(question)} text="Check Answer!" />
      </View>
    )
  }

  const ObservedQuestion = observer(QuestionComponent)

  return (
    <Screen contentContainerStyle={$root} statusBarStyle="light">
      <ListView
        ListHeaderComponent={
          <View style={$header}>
            <Text preset="heading" text="question" tx={"questionScreen.title"} />
          </View>
        }
        contentContainerStyle={$questionList}
        data={questions}
        renderItem={(item) => <ObservedQuestion question={item.item as Question} />}
        estimatedItemSize={285}
        refreshing={refreshing}
        onRefresh={fetchQuestions}
        extraData={{ extraDataForMobX: questions.length > 0 ? questions[0].question : "" }}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $header: TextStyle = {
  marginTop: spacing.xxxl,
  marginBottom: spacing.md,
}

const $questionList: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingBottom: spacing.lg,
}

const $questionWrapper: ViewStyle = {
  borderBottomColor: colors.border,
  borderBottomWidth: 1,
  paddingVertical: spacing.lg,
}

const $question: TextStyle = {
  fontWeight: "bold",
  fontSize: spacing.md,
  marginVertical: spacing.md,
}

const $answer: TextStyle = {
  fontSize: spacing.sm,
  color: colors.text,
  flex: 1,
}

const $checkAnswer: ViewStyle = {
  paddingVertical: spacing.xs,
  backgroundColor: colors.error,
  marginTop: spacing.sm,
  borderColor: colors.error,
}
