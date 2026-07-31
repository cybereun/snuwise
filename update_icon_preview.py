import base64
import os

img_path = r"l:\codex-L\snu-natural-admissions-dashboard\snuwise_icon.png"
artifact_path = r"C:\Users\j.u.Eun\.gemini\antigravity\brain\3bffed87-2604-4993-a298-37cb01cdc674\icon_preview.md"

with open(img_path, 'rb') as f:
    b64_data = base64.b64encode(f.read()).decode('utf-8')

data_uri = f"data:image/png;base64,{b64_data}"

md_content = f"""# 🦉 SNU-Wise 공식 앱 아이콘 디자인

생성되어 앱 파비콘, 홈 화면 설치 아이콘, 사이드바 로고에 적용된 **귀여운 지혜의 부엉이 학사모 아이콘**입니다.

<div style="text-align: center; padding: 20px;">
  <img src="{data_uri}" alt="SNU-Wise 귀여운 앱 아이콘" style="width: 220px; height: 220px; border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 2px solid #7D8F62;" />
</div>

---

### 🎨 디자인 포인트
- **세이지 그린 & 파피루스 톤 조화:** 앱의 메인 컬러 시스템인 올리브 세이지 그린과 완벽한 일체감
- **스마트 & 큐트 심볼:** 작은 학사모와 나뭇잎 포인트가 있는 친근하고 스마트한 캐릭터
- **다목적 적용:** 브라우저 탭 파비콘, PWA 홈 화면 앱 아이콘, 모바일 및 데스크톱 사이드바 브랜드 아이콘으로 구동
"""

with open(artifact_path, 'w', encoding='utf-8') as out_f:
    out_f.write(md_content)

print("SUCCESS: Updated icon_preview.md with Base64 URI!")
