# One-off: replaces the 11 questions in data\ssc_cgl_papers.json that near-
# duplicated the existing front-end bank (window.EXAMS). The pre-existing bank
# wins; these seeded-pool questions are swapped for distinct, verified originals
# in the SAME year+section bucket so the 25-per-section counts are preserved.
# Re-run tools\build-ssc-seed.ps1 afterwards.

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$file = Join-Path $root 'data\ssc_cgl_papers.json'
$doc = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8) | ConvertFrom-Json

$repl = @{
  'ssc_cgl_2020_t1_s1_0004' = @{ topic='Coding-Decoding'; subtopic='Letter Coding'; difficulty='medium';
    q="In a certain code language, 'TABLE' is written as 'UCEPJ'. How is 'CHAIR' written in that code?";
    A='DJDMW'; B='DJDNW'; C='EJDMW'; D='DKDMW'; correct='A';
    e="Each letter is shifted forward by 1, 2, 3, 4, 5 respectively: T+1=U, A+2=C, B+3=E, L+4=P, E+5=J. Applying the same to CHAIR: C+1=D, H+2=J, A+3=D, I+4=M, R+5=W, giving DJDMW." }

  'ssc_cgl_2020_t1_s1_0007' = @{ topic='Syllogism'; subtopic='Two Statements'; difficulty='medium';
    q="Statements: Some cats are dogs. All dogs are animals. Conclusions: I. Some cats are animals. II. All animals are dogs. Which conclusion follows?";
    A='Only I follows'; B='Only II follows'; C='Both I and II follow'; D='Neither I nor II follows'; correct='A';
    e="The cats that are dogs are also animals (all dogs are animals), so 'Some cats are animals' (I) follows. 'All animals are dogs' (II) reverses the universal wrongly and does not follow. Hence only I follows." }

  'ssc_cgl_2020_t1_s1_0041' = @{ topic='Average'; subtopic='Removed Number'; difficulty='easy';
    q="The average of 6 numbers is 30. When one number is removed, the average of the remaining 5 numbers becomes 28. The removed number is:";
    A='38'; B='40'; C='42'; D='36'; correct='B';
    e="Sum of 6 numbers = 6 x 30 = 180. Sum of remaining 5 = 5 x 28 = 140. Removed number = 180 - 140 = 40." }

  'ssc_cgl_2020_t1_s1_0045' = @{ topic='Percentage'; subtopic='Expenditure Unchanged'; difficulty='medium';
    q="If the price of sugar increases by 25%, by what percentage must a household reduce its consumption so that its expenditure on sugar remains unchanged?";
    A='25%'; B='20%'; C='16.67%'; D='15%'; correct='B';
    e="Required reduction % = increase/(100 + increase) x 100 = 25/125 x 100 = 20%." }

  'ssc_cgl_2021_t1_s1_0067' = @{ topic='Odd One Out'; subtopic='Classification'; difficulty='medium';
    q="Select the one that does NOT belong to the group: Rose, Lotus, Jasmine, Mango";
    A='Rose'; B='Lotus'; C='Jasmine'; D='Mango'; correct='D';
    e="Rose, Lotus and Jasmine are flowers, whereas Mango is a fruit. So Mango is the odd one out." }

  'ssc_cgl_2021_t1_s1_0081' = @{ topic='Economics'; subtopic='Regulators'; difficulty='medium';
    q="Which statutory body is responsible for regulating the securities market in India?";
    A='Reserve Bank of India (RBI)'; B='Securities and Exchange Board of India (SEBI)'; C='NABARD'; D='SIDBI'; correct='B';
    e="SEBI, established in 1992, is the statutory regulator of the securities (stock) market in India. RBI regulates banking and monetary policy." }

  'ssc_cgl_2021_t1_s1_0084' = @{ topic='Physics'; subtopic='Units'; difficulty='easy';
    q="The physical quantity measured in the SI unit 'pascal' is:";
    A='Force'; B='Pressure'; C='Energy'; D='Power'; correct='B';
    e="One pascal (Pa) equals one newton per square metre (N/m^2), which is the SI unit of pressure." }

  'ssc_cgl_2024_t1_s1_0266' = @{ topic='Indian Polity'; subtopic='Constitutional Offices'; difficulty='medium';
    q="Who administers the oath of office to the President of India?";
    A='The Vice-President'; B='The Speaker of the Lok Sabha'; C='The Chief Justice of India'; D='The Prime Minister'; correct='C';
    e="Under Article 60, the oath of office to the President is administered by the Chief Justice of India, or in their absence the senior-most judge of the Supreme Court." }

  'ssc_cgl_2021_t1_s1_0360' = @{ topic='Static GK'; subtopic='Festivals'; difficulty='easy';
    q="The 'Hornbill Festival', held annually in the first week of December, is celebrated in which Indian state?";
    A='Assam'; B='Nagaland'; C='Manipur'; D='Mizoram'; correct='B';
    e="The Hornbill Festival, the 'Festival of Festivals', is celebrated in Nagaland to showcase the heritage of its Naga tribes." }

  'ssc_cgl_2024_t1_s1_0479' = @{ topic='Sports'; subtopic='Rules'; difficulty='medium';
    q="In a standard game of kabaddi, how many players from each team are on the court at the start of a match?";
    A='5'; B='6'; C='7'; D='11'; correct='C';
    e="A kabaddi team has seven players on the court at the start of a match (out of a squad of twelve)." }

  'ssc_cgl_2024_t1_s1_0488' = @{ topic='Trigonometry'; subtopic='Identities'; difficulty='medium';
    q="The value of (1 + tan^2 A) / (1 + cot^2 A) at A = 30 degrees is:";
    A='1/3'; B='3'; C='1'; D='1/2'; correct='A';
    e="(1 + tan^2 A)/(1 + cot^2 A) = sec^2 A / cosec^2 A = sin^2 A / cos^2 A = tan^2 A. At A = 30 degrees, tan 30 = 1/sqrt(3), so tan^2 30 = 1/3." }
}

$seen = @{}
foreach ($q in $doc.questions) {
  if ($repl.ContainsKey($q.id)) {
    $r = $repl[$q.id]
    $q.topic = $r.topic; $q.subtopic = $r.subtopic; $q.difficulty = $r.difficulty
    $q.question_text = $r.q
    $q.options.A = $r.A; $q.options.B = $r.B; $q.options.C = $r.C; $q.options.D = $r.D
    $q.correct_option = $r.correct; $q.explanation = $r.e
    $seen[$q.id] = $true
  }
}
$missing = $repl.Keys | Where-Object { -not $seen.ContainsKey($_) }
if ($missing) { throw "Ids not found in data file: $($missing -join ', ')" }
if ($seen.Count -ne 11) { throw "Expected to patch 11, patched $($seen.Count)." }

$json = $doc | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText($file, $json, (New-Object System.Text.UTF8Encoding($false)))
Write-Host ("  Patched {0} questions in {1}" -f $seen.Count, $file) -ForegroundColor Green
