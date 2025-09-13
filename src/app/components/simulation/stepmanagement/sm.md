目的
ユーザーの学習ステップの進行状況を更新し、ローカルストレージに保存する。

概要
この関数は、terminalcommand.tsxから送信された学習ステップの完了情報に基づき、ユーザーの現在の学習進捗を更新します。具体的には、最新のTopicIdとStepIdをローカルストレージから取得し、完了フラグ(is_complete)を適用して、次のステップに進むか、または現在のステップを完了としてマークします。更新された進捗データは、ローカルストレージに日付情報とともにJSON形式で保存されます。

仕様
引数:

is_complete: boolean (terminalcommand.tsxから送信される、現在のステップが完了したかを示す真偽値)

処理:

ステップ 1: 最新の学習進捗を取得

localStorageから、キー'stepProgress'で保存されているJSONデータを取得します。

データが存在しない場合、初期値として{topicId: 1, stepId: 1}を設定します。

データが存在する場合、JSONをパースしてtopicIdとstepIdを取得します。

ステップ 2: 進捗を更新

引数is_completeがtrueの場合、現在のstepIdをインクリメントします。

topix.tsから、更新されたtopicIdに対応するexampleTopicを取得します。

更新されたstepIdが、取得したexampleTopicのステップ数を超えているか確認します。

超えている場合、topicIdをインクリメントし、stepIdを1にリセットします。

is_completeがfalseの場合、進捗は変更しません。

ステップ 3: ローカルストレージに保存

以下の情報を含むJavaScriptオブジェクトを作成します。

topicId: 更新後のtopicId

stepId: 更新後のstepId

lastUpdated: 現在の日付と時刻 (例: new Date().toISOString())

wantcode: 現在のステップの正解コード配列 (topix.tsから取得)

このオブジェクトをJSON文字列に変換します。

localStorageのキー'stepProgress'に、JSON文字列として保存します。