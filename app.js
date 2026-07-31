/**
 * 서울대 정시 입시 컨설팅 종합 플랫폼 (SNU-Wise) Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // State Management
  let currentTab = 'trend';
  let selectedCategory = 'ALL';
  let activeDeptId = 'med';
  let searchKeyword = '';

  // DOM Elements
  const navItems = document.querySelectorAll('.nav-item');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const headerTitle = document.getElementById('header-tab-title');
  const headerDesc = document.getElementById('header-tab-desc');
  const globalSearchInput = document.getElementById('global-search');
  const categoryButtons = document.querySelectorAll('#category-filter .chip-btn');
  const btnPrintReport = document.getElementById('btn-print-report');

  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const sidebar = document.querySelector('.sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');

  // Initialize
  initNavigation();
  initBumpChart();
  renderTeacherTable();
  initScoreCalculator();
  initBalanceTab();
  renderTypeComparisonTable();
  renderTierGuide();
  initPrintModal();
  updateHeader(currentTab);

  /* ==========================================================================
     0. Print Report Setup Modal & Document Renderer
     ========================================================================== */
  function initPrintModal() {
    const printModal = document.getElementById('print-setup-modal');
    const btnClosePrintModal = document.getElementById('btn-close-print-modal');
    const btnExecutePrint = document.getElementById('btn-execute-print');

    const inputStudentName = document.getElementById('print-student-name');
    const inputTeacherName = document.getElementById('print-teacher-name');
    const inputTeacherComment = document.getElementById('print-teacher-comment');

    const btnPreset1 = document.getElementById('btn-preset-1');
    const btnPreset2 = document.getElementById('btn-preset-2');
    const btnPreset3 = document.getElementById('btn-preset-3');

    // Open print modal
    if (btnPrintReport) {
      btnPrintReport.addEventListener('click', (e) => {
        e.preventDefault();
        printModal.classList.add('active');
      });
    }

    if (btnClosePrintModal) {
      btnClosePrintModal.addEventListener('click', () => {
        printModal.classList.remove('active');
      });
    }

    // Preset comment buttons
    if (btnPreset1) {
      btnPreset1.addEventListener('click', () => {
        inputTeacherComment.value = "수리과학부 및 통계학과는 타 의대 복수합격 이탈로 인한 추가합격 회전율(55.6%)이 높아 소신 상향 지원 시 유효한 전략 학과입니다. 과탐 Ⅱ 조합 (+3.0점 가산) 및 교과평가 (A·B 조합) 반영 시 최상위 컷 방어가 안정적입니다.";
      });
    }
    if (btnPreset2) {
      btnPreset2.addEventListener('click', () => {
        inputTeacherComment.value = "과탐 Ⅱ 과목 응시 가산점 (+3.0점/+5.0점) 적용으로 수능 환산점수 컷 여유분이 확보되어 주요 공학계열(전기정보, 기계) 및 약학계열 적정 합격선 방어가 매우 유효합니다.";
      });
    }
    if (btnPreset3) {
      btnPreset3.addEventListener('click', () => {
        inputTeacherComment.value = "컴퓨터공학부 70% Cut(403.9점)은 탐구2 백분위 74% 합격자 포함 착시 현상으로, 실제 50% 컷(406.9점) 형성층이 두꺼우므로 교과평가 A·B 이상 조합 시 적정 도전 전략이 권장됩니다.";
      });
    }

    // Execute Print A4 Document
    if (btnExecutePrint) {
      btnExecutePrint.addEventListener('click', () => {
        // Fill meta
        document.getElementById('p-student-name').textContent = inputStudentName.value || '김서울';
        document.getElementById('p-teacher-name').textContent = inputTeacherName.value || '이진학';
        document.getElementById('p-teacher-comment').textContent = inputTeacherComment.value || '';

        // Fill Score data from calculator
        const korStd = parseFloat(document.getElementById('calc-kor-std').value) || 134;
        const mathStd = parseFloat(document.getElementById('calc-math-std').value) || 142;
        const tam1Std = parseFloat(document.getElementById('calc-tam1-std').value) || 68;
        const tam2Std = parseFloat(document.getElementById('calc-tam2-std').value) || 66;
        const engGrade = parseInt(document.getElementById('calc-eng-grade').value) || 2;
        const historyGrade = parseInt(document.getElementById('calc-history-grade').value) || 1;
        const tamCombo = document.getElementById('calc-tam-combo').value;
        const evalGrade = document.getElementById('calc-eval-grade').value;

        const res = ADMISSIONS_DATA.calculateSNUScore(korStd, mathStd, tam1Std, tam2Std, engGrade, historyGrade, tamCombo, evalGrade);

        document.getElementById('p-kor-std').textContent = `${korStd}점`;
        document.getElementById('p-math-std').textContent = `${mathStd}점`;
        document.getElementById('p-tam1-std').textContent = `${tam1Std}점`;
        document.getElementById('p-tam2-std').textContent = `${tam2Std}점`;
        document.getElementById('p-eng-grade').textContent = `${engGrade}등급`;
        document.getElementById('p-tam-bonus').textContent = `+${res.tamBonus.toFixed(1)}점 (${tamCombo === 'I_II' ? 'Ⅰ+Ⅱ' : tamCombo === 'II_II' ? 'Ⅱ+Ⅱ' : 'Ⅰ+Ⅰ'})`;
        document.getElementById('p-eval-grade').textContent = `${evalGrade} (${res.schoolEvalScore}점)`;
        document.getElementById('p-final-score').textContent = `${res.finalTotal}점`;

        // Render Factsheet Table (Top 5 target departments)
        const factsheetTbody = document.getElementById('p-factsheet-tbody');
        if (factsheetTbody) {
          const sampleDepts = ADMISSIONS_DATA.departments.filter(d => ['math', 'stat', 'ece', 'cs', 'pharm', 'me'].includes(d.id));
          factsheetTbody.innerHTML = sampleDepts.map(dept => {
            const adiga = dept.adiga2026.general;
            const stats = ADMISSIONS_DATA.getDepartmentStats(dept.id);
            return `
              <tr>
                <td><strong>${dept.name}</strong></td>
                <td>${adiga ? adiga.score50 + '점' : '-'}</td>
                <td><strong>${adiga ? adiga.score70 + '점' : '-'}</strong></td>
                <td>${adiga ? adiga.avg70 + '%' : '-'}</td>
                <td>${stats.avgRank}위</td>
                <td>${adiga ? adiga.additionalPassed + '명 (' + stats.additionalRate + '%)' : '-'}</td>
              </tr>
            `;
          }).join('');
        }

        printModal.classList.remove('active');
        setTimeout(() => {
          window.print();
        }, 100);
      });
    }
  }

  /* ==========================================================================
     1. Navigation & Header Update (Desktop & Mobile Sync)
     ========================================================================== */
  function initNavigation() {
    const switchTab = (tab) => {
      if (tab === currentTab) return;

      navItems.forEach(n => n.classList.toggle('active', n.getAttribute('data-tab') === tab));
      mobileNavItems.forEach(n => n.classList.toggle('active', n.getAttribute('data-tab') === tab));

      tabPanes.forEach(pane => {
        pane.classList.toggle('active', pane.id === `tab-${tab}`);
      });

      currentTab = tab;
      updateHeader(tab);

      // Close mobile drawer if open
      closeMobileSidebar();

      if (tab === 'trend') {
        setTimeout(drawBumpChart, 50);
      } else if (tab === 'balance') {
        setTimeout(updateBalanceTab, 50);
      }
    };

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(item.getAttribute('data-tab'));
      });
    });

    mobileNavItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(item.getAttribute('data-tab'));
      });
    });

    // Mobile Hamburger & Backdrop Controls
    const openMobileSidebar = () => {
      if (sidebar) sidebar.classList.add('open');
      if (sidebarBackdrop) sidebarBackdrop.classList.add('open');
    };

    const closeMobileSidebar = () => {
      if (sidebar) sidebar.classList.remove('open');
      if (sidebarBackdrop) sidebarBackdrop.classList.remove('open');
    };

    if (btnMobileMenu) btnMobileMenu.addEventListener('click', openMobileSidebar);
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileSidebar);

    globalSearchInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value.trim().toLowerCase();
      renderTeacherTable();
      drawBumpChart();
      calculateAndDiagnose();
      updateBalanceTab();
      renderTypeComparisonTable();
      renderTierGuide();
    });
  }

  function updateHeader(tab) {
    // Show Print Report button ONLY in 'calc' (두 번째 탭: 정시 점수 진단)
    if (btnPrintReport) {
      if (tab === 'calc') {
        btnPrintReport.classList.add('show-print');
      } else {
        btnPrintReport.classList.remove('show-print');
      }
    }

    // Hide search box ONLY in 2nd ('calc') and 5th ('strategy') tabs
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
      if (tab === 'calc' || tab === 'strategy') {
        searchBox.classList.add('hide-search');
      } else {
        searchBox.classList.remove('hide-search');
      }
    }

    if (tab === 'trend') {
      headerTitle.textContent = '6개년 입결 트렌드 분석';
      headerDesc.textContent = '2021~2026학년도 학과별 70% Cut 순위 변동 궤적 및 시각화 솔루션';
    } else if (tab === 'calc') {
      headerTitle.textContent = '정시 점수 진단 & 교과평가 계산기';
      headerDesc.textContent = '서울대 정시 수능 환산식, 과탐Ⅱ 가산점(+3점/5점), 교과평가(A.A~C.C) 정밀 진단';
    } else if (tab === 'balance') {
      headerTitle.textContent = '충원율 & 영역별 백분위 밸런스';
      headerDesc.textContent = '추합 회전율(충원률) 및 국/수/탐 영역별 70% cut 백분위 프로필 분석';
    } else if (tab === 'compare-types') {
      headerTitle.textContent = '일반전형 vs 지역균형전형 비교';
      headerDesc.textContent = '동일 모집단위의 일반전형 vs 지균 70% cut 환산점수 및 경쟁률 1:1 비교';
    } else if (tab === 'strategy') {
      headerTitle.textContent = '입시 전략 & 5대 Tier 리포트';
      headerDesc.textContent = '서울대 입시 3대 핵심 이슈 및 백분위/환산점수 기준 5대 지원 Tier 가이드';
    }
  }


  /* ==========================================================================
     2. Interactive Bump Chart (With Wide Single-Line Badges)
     ========================================================================== */
  function initBumpChart() {
    const modalCategoryButtons = document.querySelectorAll('#modal-category-filter .chip-btn');

    const handleCategoryClick = (cat) => {
      selectedCategory = cat;
      categoryButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-cat') === cat));
      modalCategoryButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-cat') === cat));
      drawBumpChart();
    };

    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => handleCategoryClick(btn.getAttribute('data-cat')));
    });

    modalCategoryButtons.forEach(btn => {
      btn.addEventListener('click', () => handleCategoryClick(btn.getAttribute('data-cat')));
    });

    const btnExpand = document.getElementById('btn-expand-chart');
    const btnCloseModal = document.getElementById('btn-close-chart-modal');
    const chartModal = document.getElementById('chart-modal');

    const openModal = () => {
      chartModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        setTimeout(() => drawBumpChartForSvg('modal-bump-chart-svg'), 100);
      });
    };

    const closeModal = () => {
      chartModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (btnExpand) btnExpand.addEventListener('click', openModal);
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chartModal.classList.contains('active')) closeModal();
    });

    window.addEventListener('resize', drawBumpChart);
    drawBumpChart();
  }

  function drawBumpChart() {
    drawBumpChartForSvg('bump-chart-svg');
    const chartModal = document.getElementById('chart-modal');
    if (chartModal && chartModal.classList.contains('active')) {
      drawBumpChartForSvg('modal-bump-chart-svg');
    }
  }

  function drawBumpChartForSvg(svgId) {
    const svg = document.getElementById(svgId);
    if (!svg) return;

    svg.innerHTML = '';
    const isModal = svgId === 'modal-bump-chart-svg';

    let width, height, padding;

    if (isModal) {
      // ⚠️ DO NOT MODIFY MODAL CHART: Kept 100% untouched as requested
      const viewBoxWidth = 1200;
      const viewBoxHeight = 560;
      svg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');

      width = viewBoxWidth;
      height = viewBoxHeight;
      padding = { top: 40, right: 190, bottom: 60, left: 140 };
    } else {
      // Main Dashboard Chart: Fills container card width 100% dynamically
      svg.removeAttribute('viewBox');
      width = svg.clientWidth || 1000;
      height = svg.clientHeight || 400;
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      padding = { top: 30, right: 140, bottom: 50, left: 60 };
    }

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const years = ADMISSIONS_DATA.years; // ['2021', '2022', '2023', '2024', '2025', '2026']
    const xStep = chartW / (years.length - 1);
    const maxRank = 39;
    const getY = (rank) => padding.top + ((rank - 1) / (maxRank - 1)) * chartH;

    let depts = ADMISSIONS_DATA.departments;
    if (selectedCategory !== 'ALL') {
      depts = depts.filter(d => d.category === selectedCategory);
    }
    if (searchKeyword) {
      depts = depts.filter(d => d.name.toLowerCase().includes(searchKeyword));
    }

    // Grid lines & Single-line Year Badges
    years.forEach((yr, idx) => {
      const x = padding.left + idx * xStep;

      // Vertical dashed line
      const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      vLine.setAttribute('x1', x);
      vLine.setAttribute('y1', padding.top);
      vLine.setAttribute('x2', x);
      vLine.setAttribute('y2', height - padding.bottom);
      vLine.setAttribute('stroke', '#EEF1E8');
      vLine.setAttribute('stroke-dasharray', '4');
      svg.appendChild(vLine);

      // Slimmer Pill Badge (badgeWidth 88px guarantees no left edge clipping)
      const badgeWidth = 88;
      const badgeHeight = 24;
      const badgeY = height - padding.bottom + 14;

      const badgeRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      badgeRect.setAttribute('x', x - badgeWidth / 2);
      badgeRect.setAttribute('y', badgeY);
      badgeRect.setAttribute('width', badgeWidth);
      badgeRect.setAttribute('height', badgeHeight);
      badgeRect.setAttribute('rx', '12');
      badgeRect.setAttribute('ry', '12');
      badgeRect.setAttribute('fill', '#33412B');
      svg.appendChild(badgeRect);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', badgeY + 16);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#FFFFFF');
      text.setAttribute('font-size', '11.5');
      text.setAttribute('font-weight', '700');
      text.setAttribute('letter-spacing', '-0.3px');
      text.textContent = `${yr}학년도`;
      svg.appendChild(text);
    });

    // Find department with maximum 6-year rank volatility (max - min) in selected group
    let maxVolatilityDeptId = null;
    let maxDiff = -1;

    depts.forEach(dept => {
      const validRanks = Object.values(dept.ranks).filter(r => r !== null && r !== undefined);
      if (validRanks.length >= 2) {
        const diff = Math.max(...validRanks) - Math.min(...validRanks);
        if (diff > maxDiff) {
          maxDiff = diff;
          maxVolatilityDeptId = dept.id;
        }
      }
    });

    // Draw Lines & Dots for each department
    depts.forEach(dept => {
      const points = [];
      years.forEach((yr, idx) => {
        const rank = dept.ranks[yr];
        if (rank !== null && rank !== undefined) {
          const x = padding.left + idx * xStep;
          const y = getY(rank);
          points.push({ x, y, year: yr, rank: rank });
        }
      });

      if (points.length < 2) return;

      const isSelected = dept.id === activeDeptId;
      const isMostVolatile = dept.id === maxVolatilityDeptId && maxDiff > 0;
      const catColor = ADMISSIONS_DATA.categories[dept.category]?.color || '#7D8F62';

      let strokeColor = catColor;
      let strokeWidth = isModal ? '1.8' : '1.5';
      let opacity = activeDeptId ? '0.2' : '0.45';

      // 🔴 RED highlight for the department with maximum rank fluctuation in the group
      if (isMostVolatile) {
        strokeColor = '#E53935';
        strokeWidth = isModal ? '3.5' : '3.0';
        opacity = '0.95';
      }

      if (isSelected) {
        strokeColor = '#33412B';
        strokeWidth = isModal ? '4.5' : '3.8';
        opacity = '1.0';
      }

      let pathD = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cX = (prev.x + curr.x) / 2;
        pathD += ` C ${cX} ${prev.y}, ${cX} ${curr.y}, ${curr.x} ${curr.y}`;
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathD);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', strokeColor);
      path.setAttribute('stroke-width', strokeWidth);
      path.setAttribute('opacity', opacity);
      path.setAttribute('cursor', 'pointer');

      path.addEventListener('click', () => {
        activeDeptId = isSelected ? null : dept.id;
        drawBumpChart();
        highlightTableRow(dept.id);
      });

      svg.appendChild(path);

      // Dots on each year
      points.forEach(pt => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pt.x);
        circle.setAttribute('cy', pt.y);
        circle.setAttribute('r', isSelected ? '4.5' : (isMostVolatile ? '4' : '2.5'));
        circle.setAttribute('fill', strokeColor);
        circle.setAttribute('opacity', opacity);
        circle.setAttribute('cursor', 'pointer');

        circle.addEventListener('click', () => {
          activeDeptId = isSelected ? null : dept.id;
          drawBumpChart();
          highlightTableRow(dept.id);
        });

        svg.appendChild(circle);
      });

      // Label at 2026학년도 (Rightmost point)
      const lastPt = points[points.length - 1];
      if (lastPt && lastPt.year === '2026') {
        const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelText.setAttribute('x', lastPt.x + 8);
        labelText.setAttribute('y', lastPt.y + 4);
        labelText.setAttribute('fill', isMostVolatile ? '#E53935' : (isSelected ? '#33412B' : catColor));
        labelText.setAttribute('font-size', isSelected || isMostVolatile ? (isModal ? '13' : '12') : (isModal ? '11.5' : '10.5'));
        labelText.setAttribute('font-weight', isSelected || isMostVolatile ? '700' : '500');
        labelText.setAttribute('cursor', 'pointer');

        const suffix = isMostVolatile ? ` 🔥최고변동 (+${maxDiff}위)` : '';
        labelText.textContent = `${dept.name} (${lastPt.rank}위)${suffix}`;

        labelText.addEventListener('click', () => {
          activeDeptId = isSelected ? null : dept.id;
          drawBumpChart();
          highlightTableRow(dept.id);
        });

        svg.appendChild(labelText);
      }
    });
  }

  function highlightTableRow(deptId) {
    const rows = document.querySelectorAll('#teacher-main-table tbody tr');
    rows.forEach(tr => {
      tr.style.backgroundColor = '';
      if (tr.getAttribute('data-id') === deptId) {
        tr.style.backgroundColor = '#EEF2E8';
        tr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }


  /* ==========================================================================
     3. Table Rendering (Tab 1)
     ========================================================================== */
  function renderTeacherTable() {
    const tbody = document.querySelector('#teacher-main-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    let depts = ADMISSIONS_DATA.departments;

    if (searchKeyword) {
      depts = depts.filter(d => d.name.toLowerCase().includes(searchKeyword));
    }

    depts.forEach(dept => {
      const stats = ADMISSIONS_DATA.getDepartmentStats(dept.id);
      const catObj = ADMISSIONS_DATA.categories[dept.category];
      const adigaGen = dept.adiga2026.general;

      const tr = document.createElement('tr');
      tr.setAttribute('data-id', dept.id);
      if (dept.id === activeDeptId) {
        tr.style.backgroundColor = '#EEF2E8';
      }

      tr.innerHTML = `
        <td style="font-weight: 700; cursor: pointer;">${dept.name}</td>
        <td><span class="badge" style="background-color: var(--bg-hover); color: ${catObj.color};">${catObj.name}</span></td>
        <td>${dept.ranks['2021'] || '-'}</td>
        <td>${dept.ranks['2022'] || '-'}</td>
        <td>${dept.ranks['2023'] || '-'}</td>
        <td>${dept.ranks['2024'] || '-'}</td>
        <td>${dept.ranks['2025'] || '-'}</td>
        <td><strong>${dept.ranks['2026'] || '-'}</strong></td>
        <td><strong style="color:var(--primary-dark);">${adigaGen ? adigaGen.score70 + '점' : '-'}</strong></td>
        <td>${adigaGen ? adigaGen.avg70 + '%' : '-'}</td>
        <td><span class="badge badge-success">${stats.additionalRate}% (${adigaGen ? adigaGen.additionalPassed : 0}명)</span></td>
      `;

      tr.addEventListener('click', () => {
        activeDeptId = dept.id;
        drawBumpChart();
        highlightTableRow(dept.id);
      });

      tbody.appendChild(tr);
    });
  }


  /* ==========================================================================
     4. Score Calculator (1번 + 5번)
     ========================================================================== */
  function initScoreCalculator() {
    const btnCalc = document.getElementById('btn-calculate-score');
    if (btnCalc) {
      btnCalc.addEventListener('click', calculateAndDiagnose);
      calculateAndDiagnose(); // Initial run
    }
  }

  function calculateAndDiagnose() {
    const korStd = parseFloat(document.getElementById('calc-kor-std').value) || 134;
    const mathStd = parseFloat(document.getElementById('calc-math-std').value) || 142;
    const tam1Std = parseFloat(document.getElementById('calc-tam1-std').value) || 68;
    const tam2Std = parseFloat(document.getElementById('calc-tam2-std').value) || 66;
    const engGrade = parseInt(document.getElementById('calc-eng-grade').value) || 2;
    const historyGrade = parseInt(document.getElementById('calc-history-grade').value) || 1;
    const tamCombo = document.getElementById('calc-tam-combo').value;
    const evalGrade = document.getElementById('calc-eval-grade').value;

    const res = ADMISSIONS_DATA.calculateSNUScore(korStd, mathStd, tam1Std, tam2Std, engGrade, historyGrade, tamCombo, evalGrade);

    document.getElementById('calc-final-score').textContent = `${res.finalTotal} 점`;
    document.getElementById('calc-breakdown-score').textContent = 
      `수능 환산: ${res.suneungTotal}점 | 교과평가: ${res.schoolEvalScore}점 (${evalGrade}) | 과탐 Ⅱ 가산점: +${res.tamBonus.toFixed(1)}점`;

    const myScore = parseFloat(res.finalTotal);
    const matchedBox = document.getElementById('calc-matched-depts');
    if (!matchedBox) return;

    // Filter departments matching score
    const safeDepts = [];
    const modDepts = [];
    const aggDepts = [];

    ADMISSIONS_DATA.departments.forEach(dept => {
      const adiga = dept.adiga2026.general;
      if (!adiga) return;

      const diff = myScore - adiga.score70;
      if (diff >= 3.0) {
        safeDepts.push({ ...dept, cut: adiga.score70, diff: diff.toFixed(2) });
      } else if (diff >= -2.0 && diff < 3.0) {
        modDepts.push({ ...dept, cut: adiga.score70, diff: diff.toFixed(2) });
      } else if (diff >= -7.0 && diff < -2.0) {
        aggDepts.push({ ...dept, cut: adiga.score70, diff: diff.toFixed(2) });
      }
    });

    let html = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="background:#FFFFFF; border:1px solid var(--border-light); border-left:4px solid #7D8F62; border-radius:8px; padding:12px;">
          <div style="font-size:12px; font-weight:700; color:#7D8F62;">🟢 안정 합격 예상 학과 (내 점수 +3점 이상)</div>
          <div style="font-size:13px; font-weight:600; color:var(--text-main); margin-top:4px;">
            ${safeDepts.slice(0, 3).map(d => `${d.name} (70% 컷 ${d.cut}점 / +${d.diff}점)`).join('<br>') || '없음'}
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid var(--border-light); border-left:4px solid #C6924D; border-radius:8px; padding:12px;">
          <div style="font-size:12px; font-weight:700; color:#C6924D;">🟡 적정/경계 지원 학과 (내 점수 ±2점 이내)</div>
          <div style="font-size:13px; font-weight:600; color:var(--text-main); margin-top:4px;">
            ${modDepts.slice(0, 4).map(d => `${d.name} (70% 컷 ${d.cut}점 / ${d.diff}점)`).join('<br>') || '없음'}
          </div>
        </div>

        <div style="background:#FFFFFF; border:1px solid var(--border-light); border-left:4px solid #C26D63; border-radius:8px; padding:12px;">
          <div style="font-size:12px; font-weight:700; color:#C26D63;">⚡ 상향/스나이핑 도전 학과 (내 점수 -3~-7점)</div>
          <div style="font-size:13px; font-weight:600; color:var(--text-main); margin-top:4px;">
            ${aggDepts.slice(0, 3).map(d => `${d.name} (70% 컷 ${d.cut}점 / ${d.diff}점)`).join('<br>') || '없음'}
          </div>
        </div>
      </div>
    `;

    matchedBox.innerHTML = html;
  }


  /* ==========================================================================
     5. Balance & Radar Chart (3번 + 4번)
     ========================================================================== */
  function initBalanceTab() {
    const selectDept = document.getElementById('balance-dept-select');
    if (!selectDept) return;

    selectDept.innerHTML = '';
    ADMISSIONS_DATA.departments.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = d.name;
      selectDept.appendChild(opt);
    });

    selectDept.value = 'pharm';
    selectDept.addEventListener('change', updateBalanceTab);

    updateBalanceTab();
  }

  function updateBalanceTab() {
    const selectDept = document.getElementById('balance-dept-select');
    if (!selectDept) return;

    const deptId = selectDept.value;
    const dept = ADMISSIONS_DATA.departments.find(d => d.id === deptId);
    if (!dept) return;

    const adigaGen = dept.adiga2026.general;

    // Draw SVG Radar Chart
    drawRadarChart(adigaGen ? [adigaGen.kor70, adigaGen.math70, adigaGen.tam170, adigaGen.tam270] : [95, 95, 95, 95]);

    // Detail Box
    const detailBox = document.getElementById('balance-detail-box');
    if (detailBox && adigaGen) {
      detailBox.innerHTML = `
        <div style="background:var(--bg-sidebar); border:1px solid var(--border-light); padding:16px; border-radius:12px;">
          <h4 style="font-size:15px; font-weight:700; color:var(--text-main);">${dept.name} 2026학년도 입결 백분위 프로필</h4>
          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin-top:12px; font-size:13px;">
            <div>국어 70% Cut: <strong>${adigaGen.kor70}%</strong></div>
            <div>수학 70% Cut: <strong>${adigaGen.math70}%</strong></div>
            <div>탐구1 70% Cut: <strong>${adigaGen.tam170}%</strong></div>
            <div>탐구2 70% Cut: <strong>${adigaGen.tam270}%</strong></div>
            <div>평균 백분위: <strong>${adigaGen.avg70}%</strong></div>
            <div>모집인원 대비 충원: <strong>${adigaGen.additionalPassed}명 (${((adigaGen.additionalPassed/adigaGen.capacity)*100).toFixed(1)}%)</strong></div>
          </div>
        </div>
      `;
    }

    // Additional Rate Ranking List
    const addList = document.getElementById('additional-rate-list');
    if (addList) {
      let statsList = ADMISSIONS_DATA.departments.map(d => ADMISSIONS_DATA.getDepartmentStats(d.id));
      if (searchKeyword) {
        statsList = statsList.filter(d => d.name.toLowerCase().includes(searchKeyword));
      }
      const sortedByAdd = [...statsList].sort((a, b) => parseFloat(b.additionalRate) - parseFloat(a.additionalRate)).slice(0, 6);

      addList.innerHTML = sortedByAdd.map(d => `
        <div style="background:#FFF; border:1px solid var(--border-light); border-radius:8px; padding:10px 14px;">
          <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600;">
            <span>${d.name}</span>
            <span style="color:var(--primary-dark);">${d.additionalRate}% (${d.adiga2026.general ? d.adiga2026.general.additionalPassed : 0}명 추합)</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${Math.min(100, parseFloat(d.additionalRate))}%"></div>
          </div>
        </div>
      `).join('');
    }
  }

  function drawRadarChart(scores) {
    const svg = document.getElementById('radar-chart-svg');
    if (!svg) return;

    svg.innerHTML = '';
    const width = svg.clientWidth || 300;
    const height = svg.clientHeight || 280;
    const center = { x: width / 2, y: height / 2 };
    const radius = Math.min(width, height) / 2 - 35;

    const labels = ['국어', '수학', '탐구1', '탐구2'];
    const angleStep = (Math.PI * 2) / 4;

    // Draw background concentric polygons
    for (let r = 0.25; r <= 1; r += 0.25) {
      let polyD = '';
      for (let i = 0; i < 4; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = center.x + Math.cos(angle) * radius * r;
        const y = center.y + Math.sin(angle) * radius * r;
        polyD += (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
      }
      polyD += ' Z';

      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      poly.setAttribute('d', polyD);
      poly.setAttribute('fill', 'none');
      poly.setAttribute('stroke', '#EEF1E8');
      svg.appendChild(poly);
    }

    // Axes & Labels
    const points = [];
    for (let i = 0; i < 4; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = center.x + Math.cos(angle) * radius;
      const y = center.y + Math.sin(angle) * radius;

      const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      axis.setAttribute('x1', center.x);
      axis.setAttribute('y1', center.y);
      axis.setAttribute('x2', x);
      axis.setAttribute('y2', y);
      axis.setAttribute('stroke', '#EEF1E8');
      svg.appendChild(axis);

      // Label text
      const lx = center.x + Math.cos(angle) * (radius + 20);
      const ly = center.y + Math.sin(angle) * (radius + 16);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', lx);
      text.setAttribute('y', ly);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-weight', '600');
      text.setAttribute('fill', '#33412B');
      text.textContent = `${labels[i]} (${scores[i]}%)`;
      svg.appendChild(text);

      // Score point calculation (mapped from 50% ~ 100%)
      const scoreNorm = Math.max(0, (scores[i] - 50) / 50);
      const px = center.x + Math.cos(angle) * radius * scoreNorm;
      const py = center.y + Math.sin(angle) * radius * scoreNorm;
      points.push({ x: px, y: py });
    }

    // Draw Data Polygon
    let dataD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      dataD += ` L ${points[i].x} ${points[i].y}`;
    }
    dataD += ' Z';

    const dataPoly = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    dataPoly.setAttribute('d', dataD);
    dataPoly.setAttribute('fill', 'rgba(125, 143, 98, 0.35)');
    dataPoly.setAttribute('stroke', '#33412B');
    dataPoly.setAttribute('stroke-width', '2.5');
    svg.appendChild(dataPoly);

    points.forEach(pt => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pt.x);
      circle.setAttribute('cy', pt.y);
      circle.setAttribute('r', '4');
      circle.setAttribute('fill', '#33412B');
      svg.appendChild(circle);
    });
  }


  /* ==========================================================================
     6. General vs Regional Type Comparison Table (2번)
     ========================================================================== */
  function renderTypeComparisonTable() {
    const tbody = document.querySelector('#type-compare-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    let depts = ADMISSIONS_DATA.departments;
    if (searchKeyword) {
      depts = depts.filter(d => d.name.toLowerCase().includes(searchKeyword));
    }

    depts.forEach(dept => {
      const adiga = dept.adiga2026;
      if (!adiga || (!adiga.general && !adiga.regional)) return;

      if (adiga.general) {
        const trGen = document.createElement('tr');
        trGen.innerHTML = `
          <td><strong>${dept.name}</strong></td>
          <td><span class="badge" style="background:#EEF2E8; color:#33412B;">일반전형</span></td>
          <td>${adiga.general.capacity}명</td>
          <td>${adiga.general.competition} : 1</td>
          <td>${adiga.general.additionalPassed}명 (${((adiga.general.additionalPassed/adiga.general.capacity)*100).toFixed(1)}%)</td>
          <td>${adiga.general.score50}점</td>
          <td><strong style="color:var(--primary-dark);">${adiga.general.score70}점</strong></td>
          <td>${adiga.general.avg70}%</td>
          <td>수능 80% + 교과 20%</td>
        `;
        tbody.appendChild(trGen);
      }

      if (adiga.regional) {
        const trReg = document.createElement('tr');
        trReg.style.backgroundColor = '#FAFAF7';
        trReg.innerHTML = `
          <td><strong>${dept.name}</strong></td>
          <td><span class="badge" style="background:#FFF2CC; color:#7F6000;">지역균형전형</span></td>
          <td>${adiga.regional.capacity}명</td>
          <td>${adiga.regional.competition} : 1</td>
          <td>${adiga.regional.additionalPassed}명 (${((adiga.regional.additionalPassed/adiga.regional.capacity)*100).toFixed(1)}%)</td>
          <td>${adiga.regional.score50}점</td>
          <td><strong style="color:#7F6000;">${adiga.regional.score70}점</strong></td>
          <td>${adiga.regional.avg70}%</td>
          <td>수능 60% + 교과 40%</td>
        `;
        tbody.appendChild(trReg);
      }
    });
  }


  /* ==========================================================================
     7. Tier Guide (Tab 5)
     ========================================================================== */
  function renderTierGuide() {
    const container = document.getElementById('tier-guide-container');
    if (!container) return;

    container.innerHTML = '';

    ADMISSIONS_DATA.tiers.forEach(tier => {
      const deptNames = tier.departments.map(id => {
        const d = ADMISSIONS_DATA.departments.find(item => item.id === id);
        return d ? d.name : '';
      }).filter(Boolean).join(', ');

      const div = document.createElement('div');
      div.className = 'tier-card';
      div.innerHTML = `
        <div class="tier-badge-pill">Tier ${tier.level}</div>
        <div class="tier-content">
          <div class="tier-title">${tier.name}</div>
          <div class="tier-desc">${deptNames}</div>
        </div>
        <div class="tier-range">${tier.range}</div>
      `;

      container.appendChild(div);
    });
  }

});
