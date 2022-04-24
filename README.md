# 듀얼 메타 사이트 카드 번역 프로그램

![alt duelmeta](images/example.png)

마스터 듀얼 메타 / 듀얼 링크스 메타 사이트의 카드 팁들을 번역하는 크롬 확장입니다.

## 기능

- 각 사이트 접속시 카드에 마우스 커서를 올리면 기존 영어 정보 대신 한글 정보가 나옵니다.

## 설치

현재는 공식 스토어에 이 프로그램을 올린 상황이 아니므로 다음 설치 방법을 사용합니다.

1. [압축 파일](https://github.com/DuelLover/duelmeta-kr-extension/releases/download/0.1.0/md_translator.zip)를 다운로드 받고, 압축을 풉니다.

2. Chrome을 실행합니다.

3. chrome://extensions에 들어갑니다.

4. 우측 상단의 개발자 모드 스위치를 눌러 ON으로 변경합니다.

5. 좌측 상단에 나타난 "압축해제된 확장 프로그램을 로드합니다." 버튼을 클릭합니다.

6. 압축을 푼 폴더를 선택하면 동작하게 됩니다.

## 삭제

확장 프로그램 삭제를 클릭하면 됩니다.

## 언어 변경 / 데이터 변경

이 레포지토리에는 카드 데이터가 없습니다. 만약 자신이 원하는 카드 번역 리스트 데이터가 존재하고 이 프로그램을 고치고 싶으시다면,

```public/assets/data.json``` 파일을 밑의 예시처럼 ```영어 카드명 : { "name": 이름, "lore": 효과 }```의 json으로 채워넣으세요.

### 예시

```json
{
  "Superheavy Samurai Flutist":
    {
      "name": "초중무사 카게보－C",
      "lore": "\"초중무사 카게보－C(씨)\"의 ①②의 효과는 각각 1턴에 1번 밖에 사용할 수 없다. ①: 이 카드를 릴리스하고 발동할 수 있다. 패에서 \"초중무사\" 몬스터 1장을 특수 소환한다. ②: 자신 필드의 \"초중무사\" 몬스터가 효과의 대상이 되었을 때, 묘지의 이 카드를 제외하고 발동할 수 있다. 그 발동을 무효로 하고 파괴한다. 이 효과는 상대 턴에도 발동할 수 있다."
    },
  ...
}
```

## 기여

간단하기도 하고 한번에 만든 물건이라 현재 테스트는 따로 존재하지 않습니다.

이 프로그램은 ```17.*``` 보다 낮은 버전의 ```node```에서 동작합니다. 확실하게 테스트된 버전은 ```16.14```입니다.

만약 [nvm](https://github.com/nvm-sh/nvm)을 사용하신다면, 간단하게 ```nvm use```를 입력하여 프로젝트에 맞는 버전의 node를 사용할 수 있습니다.

다음 방법을 통해 동작을 테스트 합니다.

```bash
npm install
npm run watch
```

다음 방법을 통해 프로덕션 빌드를 진행할 수 있습니다.

```bash
npm install
npm run build
```

필요하면 그냥 포크해서 가져다 고쳐 쓰시거나 PR 남겨주시고, 문제 있으면 이슈에 남겨주세요.
