<p align="center">
  <img width="400" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-client/assets/133668286/d2d21fcf-9d94-452c-a4de-055a86f65320">
</p>

<br>

<p align="center">
  myJARVIS는 여러 캘린더들을 하나로 동기화하는 올인원 개인 일정 관리 및 작업 관리 웹앱 서비스입니다.
</p>

<p align="center">
  <a href="https://web.myjarvis.co/">Deployed website</a>
  <span> | </span>
  <a href="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-client">Frontend Repository</a>
  <span> | </span>
  <a href="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server">Backend Repository</a>
</p>

<br>

# 📌 CONTENTS

- [🛠 Tech Stacks](#-tech-stacks)
- [🤔 Motivation](#-motivation)
- [🕹️ Features](#-features)
- [🏔 Challenges](#-challenges)
  - [1. 여러개의 캘린더 연동, 데이터 관리는 어떻게 해야할까?](#1-여러개의-캘린더-연동-데이터-관리는-어떻게-해야할까?)
    - [1-1. Provider별로 상이한 API 결과값의 데이터 관리](#1-1-Provider별로-상이한-API-결과값의-데이터-관리)
    - [1-2. 이벤트 데이터들은 클라이언트에서 언제 어떻게 사용될까](#1-2-이벤트-데이터들은-클라이언트에서-언제-어떻게-사용될까)
    - [1-3. 일정 충돌 안내 기능을 위한 이벤트 보관](#1-3-일정-충돌-안내-기능을-위한-이벤트-보관)
  - [2. 라이브러리 없이 Date 객체 다루기](#3-라이브러리-없이-Date-객체-다루기)
    - [2-1. 커스텀 캘린더 컴포넌트 구현과 재사용성](#2-1-커스텀-캘린더-컴포넌트-구현과-재사용성)
    - [2-2. timezone 변환 기능 구현](#2-2-timezone-변환-기능-구현)
- [🗓 Schedule](#-schedule)
- [📒 Memoir](#-프로젝트-소감)

<br>

# **🛠 Tech Stacks**

### Client

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Server

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB & Mongoose](https://img.shields.io/badge/MongoDB%20&%20Mongoose-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Test

![React Dom Testing](https://img.shields.io/badge/react%20dom%20testing-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vitest](https://img.shields.io/badge/Vitest-%2344A833.svg?style=for-the-badge&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

<br>

# **🤔 Motivation**

업무를 하며 일정을 잡을 때 또는 일상에서 약속을 잡을 때, 매번 모든 일정을 기억하지 못해 개인 일정과 겹치거나 혹은 매번 각각의 캘린더를 열어 확인했던 경험이 있으실 것이라 생각합니다.

저 역시도 이러한 경험이 많았고, 이에 “회사의 일정과 개인 일정을 한번에 확인할 수는 없을까?” 라는 고민을 했었습니다. 이러한 경험에서 출발한 아이디어로, 하나의 캘린더 안에서 여러가지의 일정을 한눈에 확인하고 한번에 관리할 수 있도록 하여 일정 관리의 편의성을 높이고자 기획하게 되었습니다.

꼭 업무와 개인일정이라는 분류가 아니더라도 개인의 일정을 편의에 따라 라벨링하고, 이러한 일정들을 관리해주는 나만의 개인 비서가 있으면 좋을 것 같다는 생각에서 프로젝트 주제로 선정했습니다.

<br>

# **🕹️ Features**

### 다중 캘린더 연동 (Multiple Calendars)

<p align="center">
  <img width="600px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/8162257f-f540-43a2-a664-95f3355a0199" />
</p>

- 유저는 Outlook과 Google 캘린더 버튼을 클릭해 캘린더를 연동할 수 있습니다.
  - Google, Outlook을 교차하거나 여러개의 Google 또는 Outlook 계정을 연동하여 사용 가능합니다.
- 연동된 캘린더 계정은 프로필 항목의 상단에 표시됩니다.

<br>

### 일정 생성, 수정, 삭제 연동

<p align="center">
  <img width="600px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/00261f7b-07d7-4ab0-be81-10b8d2a9e594" />
</p>

- 유저가 myJARVIS에서 생성, 수정, 삭제한 일정은 연동한 캘린더에 반영됩니다.
  - 일정 생성시 연동된 계정이 여러개일 경우 생성하고자 하는 캘린더 계정 선택할 수 있습니다.
  - 수정 및 삭제의 경우는 해당 이벤트의 계정에 대해 변경 내용이 자동 반영됩니다.

<br>

### 일정 conflicts 관리

<p align="center">
  <img width="600px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/637351b6-1a4d-457f-a39a-a29e7cce95eb" />
</p>

- 좌측 사이드바 하단에는 이번주에 해당하는 일정 충돌 리스트(Weekly Schedule Conflicts)가 보여집니다.
  - 오늘 날짜를 기준으로 해당 주차에 겹치는 일정(Schedule conflicts)가 있다면 충돌된 일정들을 Pair로 안내합니다.
  - 해당하는 일정을 바로 수정할 수 있도록 수정버튼 클릭시 이벤트 수정 페이지로 이동합니다.
- 일정을 새롭게 생성시에는, 현재 날짜로부터 2주간의 일정에 대해 겹치는 일정이 있을 경우 알람창이 나타납니다.
  - 유저는 알람창을 끄고 일정을 수정하거나 Confirm 버튼을 눌러 일정 충돌을 무시하고 일정을 생성할 수 있습니다.
  - 충돌된 일정이 있는 날짜에는 왼쪽 사이드바 미니 캘린더에 붉은 원으로 별도 표시되며, 금주에 일정 충돌이 존재할 경우 좌측 하단의 충돌 리스트에 표시됩니다.

<br>

### 이벤트 time zone

<p align="center" style="display: flex; justify-content: center; align-items: center; padding: 0 30px" >
  <img style="margin-right: 20px;" width="500px" height="350px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/48be46f1-efe6-42fa-bba4-8e864f26c96a" />
  <img width="500px" height="350px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/9f680315-59e3-4cac-9105-602f46d29ecc" />
</p>

- 유저의 시간대(timezone)와 이벤트의 시간대가 다를 경우, 해당 이벤트의 시간은 자동으로 유저의 시간대에 맞춰 화면에 보여집니다.
- 이벤트 상세페이지에서는 해당 이벤트의 시간대로 보여집니다.

<br>

### Asana 연동

<p align="center">
  <img width="600px" src="https://github.com/alswla/alswla/assets/133668286/0b98f6bb-8a1c-490f-a802-8357647b4f8a" />
</p>

- 우측 사이드바의 Asana 아이콘을 클릭시 Asana 연동 기능을 사용할 수 있습니다.
- Asana 로그인시 Workspace의 미완료된 Task들을 가져옵니다.
- Task를 클릭 시 세부 내용을 확인할 수 있습니다.
- Task의 preview의 우측 링크 이동 버튼 혹은 상세 페이지의 타이틀 클릭시 Asana의 해당 Task 페이지로 이동합니다.

<br>

<p align="center">
  <img width="600px" src="https://github.com/alswla/alswla/assets/133668286/0c72fceb-0415-4869-8338-7d22331cf716" />
</p>

- 유저는 Task preview창의 체크모양 버튼을 클릭하여 해당 Task를 완료 상태로 변경할 수 있습니다.
  - 완료된 Task는 Asana에도 반영됩니다.

<br>

# **🏔 Challenges**

## 1. 여러개의 캘린더 연동, 데이터 관리는 어떻게 해야할까?

myJARVIS는 앞서 motivation에서 언급했던 것과 같이 회사 혹은 학교일정과 개인일정들을 한번에 확인할 수 있으면 좋겠다는 생각에서 시작한 서비스입니다.

따라서 대표적인 캘린더 서비스인 구글 캘린더 외에, 회사 혹은 학교에서 많이 사용하는 마이크로소프트의 아웃룩 캘린더를 연동할 수 있도록 두 가지 Provider를 제공하게 되었습니다.

이때, 구글과 마이크로소프트의 캘린더 각각의 API로부터 전달받는 데이터의 값뿐만 아니라, 각각의 API가 전달하는 데이터의 종류도 달랐습니다. 그 외에도 여러개의 계정에 대해 캘린더 연동을 지원하며 이벤트들에 대한 데이터베이스 관리는 어떻게 할 것인지, 클라이언트에서 이벤트 데이터를 어떻게 관리해야할지에 대하여 많은 고민을 거쳤습니다.

### 1-1. Provider별로 상이한 API 결과값의 데이터 관리

<p align="center">
  <img height="400px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/3f8343f8-197d-4645-ba9d-78562ed6145e">
</p>

위 이미지는 마이크로소프트의 캘린더 API와 구글의 캘린더 API를 호출하여 얻은 이벤트 값의 일부입니다.
각 이벤트에 대한 key값 뿐만 아니라 value의 타입 및 값이 모두 상이한 것을 확인할 수 있습니다.

따라서 User정보를 불러오기 위한 API를 호출 후 DB에 저장시 provider라는 필드를 추가하고, 해당 필드의 값에 따라 필요한 값에 대한 포맷 통합 작업을 실시했습니다.

이벤트를 불러오는 과정뿐만 아니라, 그 반대인 이벤트의 생성/삭제/수정 기능에서도 마찬가지로 사용자가 입력한 값을 각 provider별로 포맷을 변환하는 작업을 수행했습니다.

<br>

### 1-2. 이벤트 데이터들은 클라이언트에서 언제 어떻게 사용될까

여러개의 캘린더에 대한 일정을 한 화면에 통합하여 보여주기 때문에, 연동된 캘린더의 모든 일정 데이터들을 클라이언트에게 전달하게 되고, 클라이언트는 이를 화면에 렌더링합니다.

이벤트들을 렌더링하기 위해 매번 데이터베이스에 요청을 보내 데이터를 가져오거나 캘린더 API를 통해 불러오는 방법은 서버의 성능을 저하시킬뿐만 아니라 리렌더링이 계속해서 일어나기 때문에 UX 측면에서도 좋지 않습니다.

이를 해결하기 위해 zustand를 통해 이벤트들을 전역상태로 관리해주었습니다.

메인 페이지가 최초 렌더링될 시 이벤트 데이터 호출을 통해 받은 계정 데이터 정보(계정 정보 및 이벤트 데이터들)를 전역 상태로 저장함으로써 컴포넌트 이동시 불필요한 리렌더링을 최소화했습니다.

다만, zustand로 전역 상태 관리시 **persist middleware는 사용하지 않았습니다.** 그 이유는 아래와 같습니다.

<p align="center">
  <img width="500px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/4733c03c-da75-4512-9549-f1a939057cf0">
</p>

유저마다 다르겠지만, 여러 개의 캘린더에 대한 이벤트들은 보통 데이터의 양이 많을 가능성이 높습니다. 구글 캘린더의 경우, 하나의 캘린더당 최대 250개의 이벤트를 가져올 수 있습니다. 만약 유저가 구글 캘린더를 3개를 연동할 시, 최대 750개의 이벤트까지 가져오게 됩니다.

이 750개의 이벤트들을 모두 zustand persist에 저장하는 것은 아래 성능 최적화의 관점에서 적절하지 않다고 판단했습니다.

- 저장 공간 제한 : 일반적으로 웹 스토리지 API (`localStorage` 및 `sessionStorage`)는 각 도메인에 대해 5MB 내외의 저장 공간을 제공합니다(브라우저마다 다를 수 있음). 이벤트의 데이터가 한계를 초과할 수 있을 가능성이 있습니다.
- 메모리 사용 증가 : 큰 데이터 세트를 메모리에 로드하면, 브라우저의 사용 가능한 메모리가 줄어들게 됩니다.
- 데이터 직렬화/역직렬화 : 스토리지에 객체를 저장하려면 JSON으로 직렬화하는 과정이 필요하며, 사용할 때는 다시 역직렬화해야 합니다. 큰 데이터 세트의 경우, 이러한 직렬화와 역직렬화 과정이 성능에 부담을 줄 수 있습니다.
- 일정의 생성/삭제/수정: 유저가 일정을 변경할 때마다 DB를 업데이트하고 그 결과(업데이트된 이벤트)를 상태에 반영해야하므로 persist로 저장된 상태가 빈번하게 업데이트될 가능성이 있습니다.

<br>

### 1-3. 일정 충돌 안내 기능을 위한 이벤트 보관

앞서 말씀드렸듯 이벤트 데이터 전체에 대해서는 zustand persist 미들웨어를 사용하지 않았습니다. 하지만 **일정 충돌 기능의 구현에는 persist 미들웨어를 사용**하여 최적화를 진행하고자 했습니다.

myJARVIS에서는 현재 날짜의 주차에 충돌된 일정이 있을 시 (1)왼쪽 사이드바에 충돌된 일정을 pair로 보여주고, (2)일정을 생성시에 충돌되는 일정이 있을 경우 사용자에게 popup창을 통해 안내합니다.

사이드바의 충돌 안내의 경우, 오늘 날짜를 기준으로 해당하는 주차(금주)의 일정들을 모두 비교한 뒤 겹치는 일정이 있을 경우 사이드바에 pair로 렌더링합니다.

만약 전역 상태관리로만 관리하게 된다면, 상태가 초기화될 때마다 일주일의 모든 이벤트들에 대해 겹치는 일정이 있는지 다시 계산하고 리렌더링을 하게 됩니다.

하지만 일주일에 해당하는 이벤트 데이터들은 그 수가 많지 않고, 매번 일정이 겹치는지 모든 이벤트들에 대해서 확인 후 컴포넌트를 렌더링하는 것은 불필요한 연산이 실행될 수 있다고 판단했습니다. 따라서 아래와 같이 충돌된 일정들은 persist 미들웨어를 활용하여 불필요한 연산 및 렌더링을 최소화하고자 했습니다.

<p align="center">
  <img width="500px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/40da8e25-855b-45df-b1cc-536fb4c3379d">
</p>

<br>

## 2. 라이브러리 없이 Date 객체 다루기

이번에 myJARVIS 서비스를 구현하며 라이브러리 없이 Date 객체를 다뤄보게 되었습니다. 라이브러리를 사용하지 않고 Date 객체를 다뤘던 만큼 캘린더 컴포넌트의 구현과 timezone 변환 기능을 직접 구현해보았습니다.

### 2-1. Compound Component 패턴을 사용한 캘린더 컴포넌트 재사용성 증가

기존의 캘린더 라이브러리의 경우 Date 객체를 다루는 라이브러리가 dependency에 포함되어 있거나 구현이 되어있는 상태였습니다.

그 외에도 달력 컴포넌트에 이벤트를 렌더링하는 과정이 필요했기에 자연스럽게 캘린더 컴포넌트를 직접 구현하게 되었고, 그 과정에서 **Compound Component 패턴(합성컴포넌트)** 으로 관심사 분리를 통해 재사용성을 높였습니다. 그 이유와 과정에 대해 아래에서 자세히 살펴보겠습니다.

<p align="center">
 <img width="1000" alt="calendar compound component pattern" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-client/assets/133668286/80f76fa2-501c-4796-847a-ac6aa9d75152">
</p>

### header와 body의 분리

header와 body의 분리의 경우, 재사용성 외에도 UI/UX 측면을 고려하여 컴포넌트를 분리하게 되었습니다. 캘린더 헤더에는 오늘 날짜와 함께 월 단위로 캘린더를 변경할 수 있는 버튼이 존재합니다. 이때 UX를 고려해 해당 버튼 외에도 TODAY 버튼을 클릭하면 바로 오늘 날짜로 돌아올 수 있는 기능을 추가했습니다.

하지만 이벤트 생성/수정시에는 메인 페이지에 비해 TODAY 버튼의 필요성이 낮다고 생각되었고, UI 측면에서도 깔끔함을 유지하기 위해 메인페이지의 헤더에만 TODAY 버튼을 렌더링할 수 있도록 헤더를 분리하여 재사옹했습니다.

<p align="center">
  <img width="500px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/9021035a-442e-4885-a719-65008d472563">
</p>

### body컴포넌트의 분리

캘린더 body의 경우, 메인 캘린더에서는 각 계정들의 이벤트를 렌더링하고 사이드바의 미니 캘린더에서는 이벤트의 충돌이 있을 경우 이를 렌더링해야 했습니다. 그 외에도 날짜를 계산하는 로직, 충돌을 계산하는 로직 등 다양한 비즈니스 로직들과 주/요일을 렌더링하는 여러 로직들이 필요했습니다.

<p align="center">
  <img width="500px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/5871cf91-9e38-4076-beb7-c7cd87bf20c7">
</p>

그렇기 때문에 CalendarBody라는 컴포넌트가 완성이 되었을 때, 너무 많은 로직들이 하나의 컴포넌트에 존재하게 되며 코드는 길어지고 가독성은 떨어졌습니다. 뿐만 아니라, 하나의 컴포넌트에서 너무 많은 책임을 지고 있었기에 디버깅시에도 모든 코드를 살펴보아야 했습니다. 이는 리액트에서 권장하는 단일 책임 원칙(Single Responsibility Priniciple)에도 맞지 않았습니다.

이를 해결하기 위해 Compound Component(합성 컴포넌트) 패턴을 사용하여 각 컴포넌트들과 비즈니스 로직을 분리함으로써 관심사를 분리하고 SRP를 따르는 설계를 할 수 있었습니다.

<p align="center">
  <img width="500" alt="CalendarBody 상세" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-client/assets/133668286/1c3e766d-f917-4a82-a335-de23870b19e8">
</p>

하위 컴포넌트의 경우 주(Week)를 렌더링하는 CalendarWeek, 요일(Day)을 렌더링하는 CalendarDay, 그리고 이벤트를 렌더링하는 CalendarEvent로 나누고 이를 CalendarBody(최상위 컴포넌트)내에서 사용했습니다. 이때, 캘린더의 일을 계산하고 시간을 계산하는 로직들과 이벤트와 관련된 비즈니스 로직 역시 별도로 모두 각각 분리하여 필요시에만 사용했습니다.

또한 커스텀훅(useCalendarSettings)을 별도로 생성하여 isMiniCalendar의 값에 따라 변경되는 캘린더의 설정값들을 관리하여 최상위 컴포넌트에서 props로 각 하위 컴포넌트에 전달하였습니다. 커스텀훅에서는 useMemo를 활용하고, isMiniCalendar의 값에 따라 변경되는 각 설정값들을 캐싱하여 불필요한 렌더링을 줄이고자 했습니다.

<br>

### 2-2. timezone 변환 기능 구현

라이브러리 없이 Date 객체를 다루는 과정에서 또 하나의 챌린지는 바로 timezone 변환이었습니다. 구글과 아웃룩 캘린더는 각각 이벤트의 시간대를 설정할 수 있습니다.

따라서 이벤트의 시간대가 유저의 시간대와 다를 경우, 이를 유저의 시간대로 변환하여 캘린더 이벤트를 렌더링해야 했습니다. 변환하는 과정이 없을 경우, `toISOString()`으로 변환된 일정 시간이 `new Date()`의 사용에 따라 유저의 시간대로 변경되는 과정에서 오차가 생기므로 정확한 이벤트 시간을 알 수 없기 때문입니다.

처음에는 각 시간대의 offset 시간을 계산하는 알고리즘을 구현하려 했지만 DST(Daylight saving time)의 경우 매년 달라지기 때문에 단순히 offset만을 계산하는 알고리즘은 정확성이 현저히 떨어질 수 밖에 없는 상황이었습니다.

이를 해결하기 위해 Timezone API를 활용하여 DST의 offset을 확인하고, 이를 활용여 timezone을 계산하는 알고리즘을 구현하여 정확한 시간을 구할 수 있었습니다.

<p align="center">
  <img width="500px" src="https://github.com/myJARVIS-smarter-scheduling/myJARVIS-server/assets/133668286/e9b69047-1994-4466-b14e-cb6ba5ea7278">
</p>

- 유저가 선택한 시간대 or 전달받은 이벤트의 시간대를 IANA 시간대로 포맷 표준화
- 해당 시간대의 위도와 경도 값을 IANA 시간대와 함께 API 호출
- 호출 결과로 offset 값 반환
- 반환된 결과를 통해 이벤트 시간대의 UTC 시간, 사용자 시간대로 변환한 UTC 시간 계산
  - 유저가 이벤트를 생성/수정하는 경우는 DST를 적용하지 않음
  - 이미 시간대가 있는 이벤트의 경우 DST를 적용하여 유저의 시간대에 맞춰 계산
- 변환한 시간대에 대해 각 컴포넌트에서 포맷 파싱 진행
  - 캘린더 및 Preview창에는 유저의 시간대에 맞도록 new Date() 처리
  - 상세 시간대에는 해당 이벤트의 시간대를 보여주도록 파싱처리

<br>

## 🗓️ Schedule

- 프로젝트 기간 : 2024년 3월 5일 ~ 2024년 3월 26일

- 1주차

  - 아이디어 선정
  - 기술 스택 결정 및 검증
  - Boiler Plate 설정
  - KANBAN 작성
  - Google(Goolge Cloud Console), Microsoft(Azure Portal) app 생성
  - 마이크로소프트, 구글 로그인 구현
  - DB 스키마 디자인 및 유저정보 저장 로직 구현
  - 로그인 화면 구현

- 2주차

  - 커스텀 캘린더 컴포넌트 구현
  - 이벤트 preview창 & 상세페이지 구현
  - 메인화면 구현
  - 사이드바 구현 (좌측, 우측)
  - 일정충돌 리스트 및 팝업창 구현
  - 캘린더 연동 컴포넌트 구현
  - 계정 추가 로직 구현
  - 이벤트 생성/수정/삭제 Google 캘린더 연동

- 3주차

  - timezone 변환 로직 구현
  - 이벤트 생성/수정/삭제 Microsoft(Outlook) 캘린더 연동
  - Asana 사이드바 컴포넌트 구현
  - Asana Task 컴포넌트 구현
  - Asana 연동 로직 구현

- 4주차

  - UX 개선 세부기능 추가 (선택된 캘린더 보기, 충돌 리스트 내 페이지 이동 등)
  - 배포
  - 테스트코드 작성
  - README 작성

<br>

## 👩🏻‍💻 프로젝트 소감

유저와 정말 가깝게 맞닿아있는 서비스이기 때문에 UX가 굉장히 중요한 프로젝트 였습니다. 이에 프로젝트를 진행하면서 UX에 대해 정말 많은 고민을 해볼 수 있었습니다. UI/UX 측면을 고려하기 위한 커스텀 input, 캘린더 컴포넌트들을 개발하고, 외부 API들을 통합하는 과정에서 생각보다 신경써야할 것이 정말 많았습니다.

특히 라이브러리 없이 Date 객체를 다루었기 때문에 유저의 입력값에 대해, 반대로 서버에서 받은 값을 유저에게 보내주기 위한 타입변환 및 포맷변환, 그리고 timezone 변환까지 매 순간이 디버깅의 연속이었습니다. 이 과정으로 Date객체를 자바스크립트에서 다루는 것이 왜 어려운지 몸소 체험할 수 있었습니다. (물론 커스텀 input을 만들지 않았더라면 보다 수월했을 것입니다. 하지만 UI/UX 측면에서 커스텀 input을 만드는 것은 포기할 수 없었습니다.)

이렇게 UI/UX를 고려하고 생각할수록, 개발 과정에서 처리해야할 세부사항들이 많아지고 신경쓸 것들이 많아져 유지보수성을 위해 로직을 분리하는 과정을 거침에도 불구하고 필연적으로 개발과정은 보다 불편해졌습니다. 이를 통해 개발과정이 어렵고 불편해질수록 사용자는 편리해진다는 말을 몸소 체감할 수 있었습니다 😌

(특히 사용자 경험을 위해 캘린더 컴포넌트를 아예 처음부터 다시 작업했던 경우도 있었습니다. 물론 힘들고 고통스럽지 않았다면 거짓말이지만, 사용자 경험을 위한 것이라는 생각에 포기할 수 없었습니다.)

이러한 과정들을 거쳐 UI/UX가 개선되고, 남들은 눈치채지 못한 사소한 부분이 개선되는 순간 순간마다 저에게는 정말 큰 의미로 다가왔습니다.

또한 백엔드와 프론트엔드를 모두 처음부터 끝까지 다루었는데, 다중 API를 통합하며 초기 디자인했던 API를 중간에 수정하거나 백엔드의 로직을 프론트엔드로 대거 이동시켜야 함에 따른 API 호출시점의 차이 등 시행착오를 겪으며 초기 구조의 중요성과, 백엔드와 프론트엔드 간의 소통이 중요할 것이라는 것도 깨닫게 되었습니다.

이번 경험을 토대로 앞으로도 "경험"의 중요성을 계속해서 생각하며, 사용자 경험 개선에서 더 나아가 사용자의 기대를 초과할 수 있는 개발자가 될 수 있도록 성장해 나가고 싶습니다.
