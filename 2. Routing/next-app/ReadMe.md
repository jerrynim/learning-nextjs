# 2. Routring

### 폴더 구조

```
/pages
├─ index
├─ jerry
└─ person
   └─ [name]
```

### Static 경로 라우팅하기

```
<Link href="/jerry">
  <a>link to jerry</a>
</Link>
```

### 동적 경로 라우팅하기

```
<Link href="/person/[name]" as={`/person/${name}`}>
  <a>Link to someone</a>
</Link>
```

### next/router 사용하기

```
const router= useRouter();

router.push("/");
router.push("/person/[name]", `/person/${name}`) // as와 함께 사용하기

```
