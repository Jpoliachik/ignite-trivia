import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { ListView, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { Question, useStores } from "app/models"
import { decodeHTMLEntities } from "app/utils/decodeHtml"
import { ContentStyle } from "@shopify/flash-list"

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

  const QuestionComponent = ({ question }: { question: Question }) => {
    return (
      <View style={$questionWrapper}>
        <Text style={$question} text={decodeHTMLEntities(question.question || "")} />
        <View>
          {question.allAnswers.map((a, index) => {
            return (
              <View key={index} style={$answerWrapper}>
                <Text style={$answer} text={decodeHTMLEntities(a)} />
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  const ObservedQuestion = observer(QuestionComponent)

  return (
    <Screen contentContainerStyle={$root}>
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
}

const $answerWrapper: ViewStyle = {
  paddingVertical: spacing.xs,
}
