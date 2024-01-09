import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface QuestionScreenProps extends AppStackScreenProps<"Question"> {}

export const QuestionScreen: FC<QuestionScreenProps> = observer(function QuestionScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <View style={$header}>
        <Text preset="heading" text="question" tx={"questionScreen.title"} />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg,
}

const $header: TextStyle = {
  marginTop: spacing.xxxl,
  marginBottom: spacing.md,
}
